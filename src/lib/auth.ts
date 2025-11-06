function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
    if (typeof document === "undefined") return;
    const isSecure = window.location.protocol === "https:";
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax; ${isSecure ? "Secure" : ""}`.trim();
}

function deleteCookie(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function getAccessToken(): string | null {
    return getCookie("accessToken");
}

export function setAccessToken(token: string): void {
    // 15 minutes default to align with backend access token expiry
    setCookie("accessToken", token, 15 * 60);
}

export function clearAccessToken(): void {
    deleteCookie("accessToken");
}

// Decode base64url without relying on atob quirks
function base64UrlDecode(input: string): string {
    try {
        const base64 = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
        if (typeof window === "undefined") return Buffer.from(base64, "base64").toString("utf-8");
        return decodeURIComponent(
            Array.prototype.map
                .call(atob(base64), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
    } catch (_) {
        return "";
    }
}

export function getAccessTokenExpiry(token: string): number | null {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;
        const json = base64UrlDecode(payload);
        const data = JSON.parse(json);
        if (typeof data?.exp !== "number") return null;
        return data.exp * 1000; // ms
    } catch {
        return null;
    }
}

export function isAccessTokenValid(token: string, clockSkewMs: number = 30_000): boolean {
    const expiryMs = getAccessTokenExpiry(token);
    if (!expiryMs) return false;
    return expiryMs - clockSkewMs > Date.now();
}


