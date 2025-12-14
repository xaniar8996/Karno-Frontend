import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";

export async function GET(req: NextRequest) {
    const accessToken = getAccessTokenFromRequest(req);

    try {
        const response = await BaseAPI.get("/cv/userCv", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        return NextResponse.json(response.data)
    } catch (error: any) {
        console.error("Error fetching user:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data
        });
        return NextResponse.json(
            {
                error: "Failed to fetch user data",
                details: error?.response?.data?.message || error?.message
            },
            { status: error?.response?.status || 500 }
        );
    }
}