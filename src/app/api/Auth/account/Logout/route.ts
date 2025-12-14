import { getAccessTokenFromRequest } from "@lib/auth";
import { BaseAPI } from "@lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const accessToken = getAccessTokenFromRequest(req);
        
        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        const LogoutResponse = await BaseAPI.post("/logout", {}, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        return NextResponse.json(LogoutResponse.data, { status: LogoutResponse.status });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error?.response?.data?.message || "Failed to logout" },
            { status: error?.response?.status || 500 }
        );
    }
}