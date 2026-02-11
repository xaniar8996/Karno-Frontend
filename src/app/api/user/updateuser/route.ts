import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        // Read auth token from cookies / headers
        const accessToken =
            req.cookies.get("accessToken")?.value ||
            req.headers.get("authorization")?.replace("Bearer ", "");

        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        // Read body sent from the client (id + editable fields)
        const body = await req.json().catch(() => null);

        if (!body || !body._id) {
            return NextResponse.json(
                { error: "id and other data are required !" },
                { status: 401 }
            );
        }

        // Forward request to backend with body + auth header
        const response = await BaseAPI.put("/users/update", body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data);
    } catch (error: any) {
        console.error("Error updating user:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return NextResponse.json(
            {
                error: "Failed to update user",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}