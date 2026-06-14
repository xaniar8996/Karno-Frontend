"use client";
import Mainpage from "@components/Home-components/mainpage";
import { useCheckAuth } from "@hooks/auth/useCheckAuth";
import Loading from "@app/loadings/loading";

export default function HomePage() {
    // Redirect unauthenticated users to /Auth/login
    const { isChecking } = useCheckAuth({ 
        redirectTo: "/Auth/login", 
        redirectIfAuthenticated: false 
    });

    // Show loading while checking authentication
    if (isChecking) {
        return <Loading />;
    }

    return <Mainpage />;
}