import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
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

        const body = await req.json();

        const payload: Record<string, string> = {};
        
        if (body.Fullname) payload.Fullname = body.Fullname;
        if (body.email) payload.email = body.email;
        
        if (Object.keys(payload).length === 0) {
            return NextResponse.json(
                {
                    error: "No editable fields provided",
                },
                {
                    status: 400,
                }
            );
        }

        // Forward request to backend with body + auth header
        const response = await BaseAPI.patch("/users/edit-profile", payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data);
    } catch (error: any) {
        console.error("Error editing user:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return NextResponse.json(
            {
                error: "Failed to edit user's username",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}