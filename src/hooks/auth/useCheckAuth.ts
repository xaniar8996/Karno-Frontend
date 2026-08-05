"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, isAccessTokenValid } from "@lib/auth";
import { useRefreshAccessToken } from "@hooks/auth/useRefreshAccesstoken";

type UseCheckAuthOptions = {
    redirectTo?: string;
    redirectIfAuthenticated?: boolean; 
};

export const useCheckAuth = (options: UseCheckAuthOptions = {}) => {
    const { 
        redirectTo = "/Home", 
        redirectIfAuthenticated = true 
    } = options;
    
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { refresh, loading } = useRefreshAccessToken();

    useEffect(() => {
        const checkAuth = async () => {
            const token = getAccessToken();
            const valid = token ? isAccessTokenValid(token) : false;

            // If token is missing or expired, try to refresh
            if (!valid) {
                const newToken = await refresh();
                if (newToken) {
                    // User is authenticated
                    setIsAuthenticated(true);
                    if (redirectIfAuthenticated) {
                        router.replace(redirectTo);
                        return;
                    }
                    setIsChecking(false);
                    return;
                }
                // User is not authenticated
                setIsAuthenticated(false);
                if (!redirectIfAuthenticated) {
                    router.replace(redirectTo);
                    return;
                }
                setIsChecking(false);
                return;
            } else {
                // User is already authenticated
                setIsAuthenticated(true);
                if (redirectIfAuthenticated) {
                    router.replace(redirectTo);
                    return;
                }
                setIsChecking(false);
                return;
            }
        };

        checkAuth();
    }, [router, refresh, redirectTo, redirectIfAuthenticated]);

    return { 
        isChecking: isChecking || loading, 
        isAuthenticated 
    };
}