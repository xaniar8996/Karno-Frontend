import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "@lib/auth";

export const BaseAPI = axios.create({
    baseURL:"http://localhost:3500",
    withCredentials: true
})

// A dedicated client for refresh endpoint without auth/refresh interceptors
export const RefreshAPI = axios.create({
    baseURL: "http://localhost:3500",
    withCredentials: true,
});

// Attach Authorization header if access token exists
BaseAPI.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 by attempting to refresh and retrying once
BaseAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config || {};

        // Avoid refresh attempts for the refresh endpoint itself
        const url = (originalRequest.url || "") as string;
        if (url.includes("/Refresh")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Use RefreshAPI to avoid interceptor recursion
                const refreshResponse = await RefreshAPI.get("/Refresh");
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