import { BaseAPI } from "@lib/axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const LoginResponse = await BaseAPI.post("/Login", body, {
            // ensure cookies from backend are accepted
            withCredentials: true,
        });

        const response = NextResponse.json(LoginResponse.data, { status: LoginResponse.status });

        // forward Set-Cookie headers from backend so browser stores refresh token
        const setCookie = LoginResponse.headers["set-cookie"];
        if (setCookie) {
            setCookie.forEach((cookie: string) => {
                response.headers.append("set-cookie", cookie);
            });
        }

        return response;
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error?.response?.data?.message || "Failed to logout" },
            { status: error?.response?.status || 500 }
        );
    }
}