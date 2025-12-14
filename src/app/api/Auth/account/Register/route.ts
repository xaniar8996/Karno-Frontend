import { BaseAPI } from "@lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const RegisterResponse = await BaseAPI.post("/Register", body);

        return NextResponse.json(RegisterResponse.data, { status: RegisterResponse.status });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error?.response?.data?.message || "Failed to logout" },
            { status: error?.response?.status || 500 }
        );
    }
}