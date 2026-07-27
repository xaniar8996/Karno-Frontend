import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const AllOrSingleUser = searchParams.get("all") === "true"; 


        const accessToken = req.cookies.get("accessToken")?.value ||
            req.headers.get("authorization")?.replace("Bearer ", "");

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

        // Backend returns { success: true, message: "...", data: user }
        // Extract the actual user data from the response
        if (response?.data?.success && response?.data?.data) {
            return NextResponse.json(response.data.data);
        }

        // If response format is unexpected, return the whole response
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