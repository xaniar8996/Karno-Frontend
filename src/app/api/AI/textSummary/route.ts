import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";

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

        if (!body || !body.description) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 });
        }

        const response = await BaseAPI.post("/ai/text-summary", body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data);
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
