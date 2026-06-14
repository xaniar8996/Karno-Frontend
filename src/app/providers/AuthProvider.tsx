"use client"

import { useEffect, useRef } from "react";
import { useRefreshAccessToken } from "@hooks/auth/useRefreshAccesstoken";
import { getAccessToken, isAccessTokenValid, getAccessTokenExpiry } from "@/lib/auth";

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const { refresh } = useRefreshAccessToken();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const maybeRefresh = () => {
      const token = getAccessToken();
      const valid = token ? isAccessTokenValid(token) : false;
      if (!valid) {
        refresh();
      }
    };

    maybeRefresh();

    // Refresh on tab focus/return
    const onFocus = () => maybeRefresh();
    const onOnline = () => maybeRefresh();
    window.addEventListener("focus", onFocus);
    window.addEventListener("visibilitychange", onFocus);
    window.addEventListener("online", onOnline);

    // Periodic refresh as a safety net (every 10 minutes)
    intervalRef.current = window.setInterval(() => {
      const token = getAccessToken();
      if (!token) {
        refresh();
        return;
      }
      const expiry = getAccessTokenExpiry(token);
      // Refresh proactively if expiring within the next 60s
      if (!expiry || expiry - Date.now() < 60_000) {
        refresh();
      }
    }, 10 * 60 * 1000);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("online", onOnline);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [refresh]);

  return <>{children}</>;
}


