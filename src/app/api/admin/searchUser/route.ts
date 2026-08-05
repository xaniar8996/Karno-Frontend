import { BaseAPI } from "@lib/axios";
import { getAccessTokenFromRequest } from "@lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  try {
    const accessToken = getAccessTokenFromRequest(req);

    if (!accessToken) {
      return NextResponse.json(
        { error: "No authentication token found" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const role = searchParams.get("role");
  
    const response = await BaseAPI.get("/admin/user-search", {
        params: {
            search,
            page,
            limit,
            role,
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    return NextResponse.json(response?.data);
  } catch (error: any) {
    console.error("Error searching user:", error);
    console.error("Error details:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    return NextResponse.json(
      {
        error: "Failed to search the user",
        details: error?.response?.data?.message || error?.message,
      },
      { status: error?.response?.status || 500 },
    );
  }
}
