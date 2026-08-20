import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);

        if (!body?.resetToken || !body?.newPassword) {
            return NextResponse.json(
                { error: "Reset token and new password are required" },
                { status: 400 }
            );
        }

        const response = await BaseAPI.post("/otp/reset-password", {
            resetToken: body.resetToken,
            newPassword: body.newPassword,
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data, {
            status: response?.status || 400,
        });
    } catch (error: any) {
        console.error("Error resetting password:", error);
        return NextResponse.json(
            {
                error: "Failed to reset password",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}
