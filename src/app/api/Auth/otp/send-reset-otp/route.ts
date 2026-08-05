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

        const body = await req.json().catch(() => null);

        if (!body) {
            return NextResponse.json(
                { error: "body is required !" },
                { status: 401 }
            );
        }

        const response = await BaseAPI.post(
            "/otp/reset-otp",
            {
                email: body.email,
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
        console.error("Error reseting OTP:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return NextResponse.json(
            {
                error: "Failed to reset OTP",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}