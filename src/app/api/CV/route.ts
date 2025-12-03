import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@lib/auth";

export async function POST(req: NextRequest) {

    try {
        const accessToken = req.cookies.get("accessToken")?.value
        req.headers.get("authorization")?.replace("Bearer ", "");

        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            )
        }

        const body = await req.json();

        const response = await BaseAPI.post("/cv/create", body, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response?.data && response?.status === 200) {
            return NextResponse.json(response.data)
        }

        return NextResponse.json(response.data)
    } catch (error) {
        console.log(error);
    }
}