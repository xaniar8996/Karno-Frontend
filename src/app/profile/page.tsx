"use client";

import Profile from "@components/Profile/Profile";
import { useCheckAuth } from "@hooks/auth/useCheckAuth";
import Loading from "@app/loadings/loading";

export default function ProfilePage() {
    const { isChecking } = useCheckAuth({
        redirectTo: "/Auth/login",
        redirectIfAuthenticated: false,
    });

    if (isChecking) {
        return <Loading />;
    }

    return (
        <div className="w-full h-auto">
            <Profile />
        </div>
    );
}