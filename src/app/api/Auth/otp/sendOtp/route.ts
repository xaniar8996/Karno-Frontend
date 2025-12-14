import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";

export async function POST(req : NextRequest) {
    try {
        const accessToken = getAccessTokenFromRequest(req);
        
        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        const otpResponse = await BaseAPI.post("/otp/send-otp", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return NextResponse.json(otpResponse.data, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error?.response?.data?.message || "Failed to send OTP" },
            { status: error?.response?.status || 500 }
        );
    }
}