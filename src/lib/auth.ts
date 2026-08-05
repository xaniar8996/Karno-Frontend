// Client-side auth helpers
// Security change: do NOT persist access tokens in cookies accessible to JS.
// Keep access token in-memory on the client.

let inMemoryAccessToken: string | null = null;

export function getAccessToken(): string | null {
    return inMemoryAccessToken;
}

// Server-side version for Next.js API routes.
// The browser forwards the in-memory token via Authorization header.
export function getAccessTokenFromRequest(req: { headers: { get: (name: string) => string | null } }): string | null {
    const authorization = req.headers.get("authorization") || req.headers.get("Authorization");
    if (!authorization) return null;
    return authorization.replace(/^Bearer\s+/i, "").trim() || null;
}

export function setAccessToken(token: string): void {
    inMemoryAccessToken = token;
}

export function clearAccessToken(): void {
    inMemoryAccessToken = null;
}

// Refresh token is stored as httpOnly cookie by backend. To clear it,
// call the backend logout endpoint which will clear the cookie server-side.
export async function clearRefreshToken(): Promise<void> {
    try {
        const token = inMemoryAccessToken;
        await fetch("/logout", { method: "POST", credentials: "include", headers: token ? { Authorization: `Bearer ${token}` } : {} });
    } catch (e) {
        // ignore
    }
}

export async function clearAllTokens(): Promise<void> {
    clearAccessToken();
    await clearRefreshToken();
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


