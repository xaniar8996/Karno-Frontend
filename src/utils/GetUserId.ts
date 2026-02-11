import decodeJWTPayload from "@utils/usedecodeJWT";
import { getAccessToken } from "@lib/auth";

export const getUserId = () => {
    const token = getAccessToken();
    if (!token) return null;

    try {
        const decoded = decodeJWTPayload(token);

        // ببین backend چی گذاشته
        return decoded?.id || null;

    } catch {
        return null;
    }
};