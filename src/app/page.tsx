"use client"

import "../assets/style/globals.css";
import "../assets/style/Fontface.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, isAccessTokenValid } from "@lib/auth";
import Homepage from "./Home/page";
import { useRefreshAccessToken } from "@/hooks/useRefreshAccesstoken";

export default function Home() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const { refresh, loading } = useRefreshAccessToken();

  useEffect(() => {
    const token = getAccessToken();
    const valid = token ? isAccessTokenValid(token) : false;
    setHasToken(valid);
    // If missing or expired, try one background refresh before showing login
    if (!valid) {
      (async () => {
        const newToken = await refresh();
        setHasToken(Boolean(newToken));
      })();
    }
  }, [router, refresh]);

  useEffect(() => {
    if (hasToken === null || loading) return;
    if (hasToken) {
      router.push("/Home");
    } else {
      router.push("/Auth/login");
    }
  }, [hasToken, loading, router]);

  if (hasToken === null || loading) {
    return null;
  }

  return (
    <h1>Karno</h1>
  );
}

