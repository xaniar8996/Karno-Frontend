import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "@lib/auth";

const isMobile =
  typeof window !== "undefined" &&
  !window.location.hostname.includes("localhost");

export const BaseAPI = axios.create({
  baseURL: isMobile
    ? "http://192.168.1.102:3500" 
    : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const NextAPI = axios.create({
  withCredentials: true,
});

const attachAccessToken = (config: any) => {
    const token = getAccessToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};

BaseAPI.interceptors.request.use(attachAccessToken);
NextAPI.interceptors.request.use(attachAccessToken);

BaseAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config || {};

        const url = (originalRequest.url || "") as string;
        if (url.includes("/Refresh")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await BaseAPI.get("/Refresh");
                const newAccessToken = refreshResponse.data?.accessToken;
                if (newAccessToken) {
                    setAccessToken(newAccessToken);
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return BaseAPI(originalRequest);
                }
            } catch (_) {
                clearAccessToken();
            }
        }
        return Promise.reject(error);
    }
);