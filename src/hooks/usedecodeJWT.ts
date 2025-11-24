import base64UrlDecode from "../lib/base64UrlDecode";

export default function decodeJWTPayload(token: string): any | null {
    try {
        const [, payload] = token.split(".");
        if (!payload) return null;

        const json = base64UrlDecode(payload);
        return JSON.parse(json);
    } catch {
        return null;
    }
}
