
import { BaseAPI } from "@lib/axios";
import { getAccessTokenFromRequest } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const accessToken = getAccessTokenFromRequest(req);

        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        // Read body sent from the client (id, username)
        const body = await req.json().catch(() => null);

        if (!body || !body.userId ) {
            return NextResponse.json(
                { error: "body is required !" },
                { status: 401 }
            );
        }

        // Forward request to backend with proper Axios signature:
        // axios.post(url, data, config)
        const response = await BaseAPI.post(
            "/notifications/sendNotification",
            {
                userId: body.userId,
                title: body.title,
                message: body.message,
                type: body.type,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data);
    } catch (error: any) {
        console.error("Error sending notification to user:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return NextResponse.json(
            {
                error: "Failed to send notification",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}