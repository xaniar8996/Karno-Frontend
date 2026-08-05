import { BaseAPI } from "@lib/axios";
import { getAccessTokenFromRequest } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const AllOrSingleUser = searchParams.get("all") === "true"; 


        const accessToken = getAccessTokenFromRequest(req);

        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }

        const url = AllOrSingleUser ? "all" : "single-user"

        const response = await BaseAPI.get(`/users/${url}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response?.data?.success && response?.data?.data) {
            return NextResponse.json(response.data.data);
        }

        return NextResponse.json(response?.data);
    } catch (error: any) {
        console.error("Error fetching user:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.response?.status,
            data: error?.response?.data
        });
        return NextResponse.json(
            {
                error: "Failed to fetch user data",
                details: error?.response?.data?.message || error?.message
            },
            { status: error?.response?.status || 500 }
        );
    }
}