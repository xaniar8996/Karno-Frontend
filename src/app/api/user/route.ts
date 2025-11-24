import { BaseAPI } from "@lib/axios";
import { NextRequest , NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    try {
        // getAccessToken() doesn't work server-side because it uses document.cookie
        // Instead, read the cookie directly from the request
        const accessToken = req.cookies.get("accessToken")?.value || 
                           req.headers.get("authorization")?.replace("Bearer ", "");
        
        if (!accessToken) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }
        
        const response = await BaseAPI.get("/users/single-user", {
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