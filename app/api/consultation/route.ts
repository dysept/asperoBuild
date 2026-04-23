import { NextRequest, NextResponse } from "next/server";
import { addConsultation } from "@/lib/storage";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, service, time, message } = body;

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const entry = await addConsultation({
    name,
    phone,
    service: service || "",
    time: time || "",
    message: message || "",
  });
  return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
}
