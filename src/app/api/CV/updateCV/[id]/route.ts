import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3500";

// Proxy update CV with multipart/form-data support
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const accessToken = getAccessTokenFromRequest(req);
  const url = new URL(req.url);
  const pathId = url.pathname.split("/").filter(Boolean).pop(); // last segment
  const cvId =
    params?.id ||
    url.searchParams.get("id") ||
    url.searchParams.get("editId") ||
    pathId;

  if (!cvId) {
    return NextResponse.json(
      { success: false, message: "cv id is required" },
      { status: 400 }
    );
  }

  try {
    const incomingForm = await req.formData();
    const form = new FormData();
    incomingForm.forEach((value, key) => {
      form.append(key, value as any);
    });

    const backendRes = await fetch(`${API_BASE}/cv/${cvId}`, {
      method: "PUT",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: form,
    });

    const data = await backendRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("proxy update CV error", error?.message || error);
    return NextResponse.json(
      { success: false, message: "failed to update CV" },
      { status: 500 }
    );
  }
}

