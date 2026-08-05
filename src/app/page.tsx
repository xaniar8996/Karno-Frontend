"use client"
// @ts-ignore
import "../assets/style/globals.css";
// @ts-ignore
import "../assets/style/Fontface.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, isAccessTokenValid } from "@lib/auth";
import { useRefreshAccessToken } from "@hooks/auth/useRefreshAccesstoken";
import { Router } from "next/router";
import Loading from "./loadings/loading";

export default function Home() {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const { refresh, loading } = useRefreshAccessToken();

  useEffect(() => {
    const handleStart = () => setLoad(true);
    const handleComplete = () => setLoad(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [])

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

  if (load) {
    return <Loading />
  }

}

