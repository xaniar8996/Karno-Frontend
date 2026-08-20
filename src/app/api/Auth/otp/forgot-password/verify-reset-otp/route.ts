import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);

        if (!body?.email || !body?.OTP) {
            return NextResponse.json(
                { error: "Email and OTP are required" },
                { status: 400 }
            );
        }

        const response = await BaseAPI.post("/otp/verify-reset-otp", {
            email: body.email,
            OTP: body.OTP,
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data, {
            status: response?.status || 400,
        });
    } catch (error: any) {
        console.error("Error verifying forgot-password OTP:", error);
        return NextResponse.json(
            {
                error: "Failed to verify OTP",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}
