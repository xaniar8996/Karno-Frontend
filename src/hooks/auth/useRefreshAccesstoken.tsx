import { useCallback, useState } from "react";
import { BaseAPI } from "@lib/axios";
import { setAccessToken, clearAccessToken } from "@lib/auth";

export function useRefreshAccessToken() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const refresh = useCallback(async (): Promise<string | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseAPI.get("/Refresh", { withCredentials: true });
            const token: string | null = response.data?.accessToken ?? null;
            if (token) {
                setAccessToken(token);
            } else {
                clearAccessToken();
            }
            return token;
        } catch (err) {
            setError(err);
            clearAccessToken();
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return { refresh, loading, error };
}