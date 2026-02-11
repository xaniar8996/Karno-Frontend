import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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

        // Read body sent from the client (id, username)
        const body = await req.json().catch(() => null);

        if (!body || !body.id || !body.username) {
            return NextResponse.json(
                { error: "id and username are required !" },
                { status: 401 }
            );
        }

        // Forward request to backend, mapping id -> _id as expected by the controller
        const response = await BaseAPI.delete("/users/delete", {
            data: {
                _id: body.id,
                username: body.username,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data);
    } catch (error: any) {
        console.error("Error deleting user:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return NextResponse.json(
            {
                error: "Failed to delete user",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}