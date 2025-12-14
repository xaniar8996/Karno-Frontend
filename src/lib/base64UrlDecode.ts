export default function base64UrlDecode(input: string): string {
    try {
      const base64 = input
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(Math.ceil(input.length / 4) * 4, "=");
  
      if (typeof window === "undefined") {
        return Buffer.from(base64, "base64").toString("utf-8");
      }
  
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(base64), (char: string) => {
            return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    } catch {
      return "";
    }
  }
  
  // Github repo ...