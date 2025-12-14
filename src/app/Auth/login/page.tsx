"use client";
import LoginForm from "@components/Auth/LoginForm";
import { useCheckAuth } from "@hooks/useCheckAuth";
import Loading from "@app/loadings/loading";

export default function LoginPage() {
    // Redirect authenticated users to /Home
    const { isChecking } = useCheckAuth({ 
        redirectTo: "/Home", 
        redirectIfAuthenticated: true 
    });

    // Show loading while checking authentication
    if (isChecking) {
        return <Loading />;
    }

    return <LoginForm />;
}