"use client";
import RegisterForm from "@components/Auth/RegisterForm";
import { useCheckAuth } from "@hooks/useCheckAuth";
import Loading from "@app/loadings/loading";

export default function RegisterPage() {
    // Redirect authenticated users to /Home
    const { isChecking } = useCheckAuth({ 
        redirectTo: "/Home", 
        redirectIfAuthenticated: true 
    });

    // Show loading while checking authentication
    if (isChecking) {
        return <Loading />;
    }

    return <RegisterForm />;
}