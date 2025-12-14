import { getAccessTokenFromRequest } from "@lib/auth";
import { BaseAPI } from "@lib/axios";
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

        // Read OTP from request body
        const body = await req.json();
        const { OTP } = body;

        if (!OTP) {
            return NextResponse.json(
                { error: "OTP is required" },
                { status: 400 }
            );
        }

        // Backend middleware will extract user ID from JWT token
        const otpResponse = await BaseAPI.post("/otp/verify-account", { OTP }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        return NextResponse.json(otpResponse.data, { status: otpResponse.status });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error?.response?.data?.message || "Failed to verify email" },
            { status: error?.response?.status || 500 }
        );
    }
}