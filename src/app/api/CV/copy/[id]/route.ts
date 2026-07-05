import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";
import { BaseAPI } from "@lib/axios";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const accessToken = getAccessTokenFromRequest(req);
    const url = new URL(req.url);
    const pathId = url.pathname.split("/").filter(Boolean).pop();
    const id = params?.id || url.searchParams.get("id") || pathId;

    if (!id) {
        return NextResponse.json(
            { success: false, message: "شناسه رزومه الزامی است" },
            { status: 400 }
        );
    }

    try {
        const backendRes = await BaseAPI.post(`/cv/copy/${id}`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return NextResponse.json(backendRes.data, {
            status: backendRes.status,
        });

    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "failed to fetch CV"
            },
            { status: 500 }
        );
    }
}

