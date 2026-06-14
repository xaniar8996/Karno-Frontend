import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";

export async function DELETE(req: NextRequest) {
    try {
        const accessToken = getAccessTokenFromRequest(req);
        
        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        const body = await req.json().catch(() => null);

        if (!body || !body.id) {
            return NextResponse.json(
                { error: "CV id is required" },
                { status: 400 }
            );
        }

        const response = await BaseAPI.delete(`/cv/${body.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.data?.success) {
            return NextResponse.json(response.data);
        }

        return NextResponse.json(response?.data);
    } catch (error: any) {
        console.error("Error deleting CV:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return NextResponse.json(
            {
                error: "Failed to delete CV",
                details: error?.response?.data?.message || error?.message,
            },
            { status: error?.response?.status || 500 }
        );
    }
}
