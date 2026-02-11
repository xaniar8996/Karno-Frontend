import { usePathname } from "next/navigation";

export const hiddenRoutes = () => {
    const pathname = usePathname();

    const hiddenRoutes = [
        "/Auth/login",
        "/Auth/register",
        "/Auth/VerifyEmail",
        "/Auth/error/UnverifiedEmail",
        "/Admin/Dashboard"
    ]

    return hiddenRoutes.includes(pathname)

}