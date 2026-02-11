import { getAccessTokenFromRequest } from "@lib/auth";
import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const accessToken = getAccessTokenFromRequest(req);

    if (!accessToken) {
        return NextResponse.json({ error: "No authentication token found" }, { status: 401 });
    }

    try {
        const response = await BaseAPI.get("/cv/all", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return NextResponse.json(response.data.data, { status: response.status });
    } catch (error) {
        console.error("Error fetching all CVs:", error);
        return NextResponse.json({ error: "Failed to fetch all CVs" }, { status: 500 });
    }
}