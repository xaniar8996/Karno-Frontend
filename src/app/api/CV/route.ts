import { NextRequest, NextResponse } from "next/server";
import { getAccessTokenFromRequest } from "@lib/auth";

const API_BASE = process.env.NEXT_PUBLIC_API_URL 

export async function POST(req: NextRequest) {
  const accessToken = getAccessTokenFromRequest(req);

  try {
    const incomingForm = await req.formData();
    const form = new FormData();
    incomingForm.forEach((value, key) => {
      form.append(key, value as any);
    });

    const backendRes = await fetch(`${API_BASE}/cv/create`, {
      method: "POST",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: form,
    });

    const data = await backendRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error("proxy create CV error", error?.message || error);
    return NextResponse.json(
      { success: false, message: "failed to create CV" },
      { status: 500 }
    );
  }
}