import { BaseAPI } from "@lib/axios";
import { getAccessTokenFromRequest } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const accessToken = getAccessTokenFromRequest(req);

        if (!accessToken) {
            return NextResponse.json(
                { success: false, message: "No authentication token found" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        // If userId is provided → admin fetching notifications for a specific user
        const backendPath = userId
            ? `/notifications/get-notifications/${userId}`
            : "/notifications/get-notifications"; // current logged‑in user

        const response = await BaseAPI.get(backendPath, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json(response.data, {
            status: response.status,
        });
    } catch (error: any) {
        console.error("Error fetching notifications:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch notifications",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}

