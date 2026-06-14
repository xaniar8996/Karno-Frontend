import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";
import { BaseAPI } from "@lib/axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const accessToken = getAccessTokenFromRequest(req);
  const url = new URL(req.url);
  const pathId = url.pathname.split("/").filter(Boolean).pop(); // last segment
  const id = params?.id || url.searchParams.get("id") || pathId;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "شناسه رزومه الزامی است" },
      { status: 400 }
    );
  }

  try {
    const backendRes = await BaseAPI.get(`/cv/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // backend already returns { success, message, data }
    return NextResponse.json(backendRes.data, {
      status: backendRes.status,
    });
  } catch (error: any) {
    console.error("proxy get CV by id error", error?.message || error);
    return NextResponse.json(
      { success: false, message: "failed to fetch CV" },
      { status: 500 }
    );
  }
}

