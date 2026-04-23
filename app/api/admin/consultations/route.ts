import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { readDB, writeDB } from "@/lib/storage";

export async function GET(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await readDB();
  return NextResponse.json(db.consultations.slice().reverse());
}

export async function PATCH(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await request.json();
  const db = await readDB();
  const idx = db.consultations.findIndex((c) => c.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.consultations[idx].status = status;
  await writeDB(db);
  return NextResponse.json(db.consultations[idx]);
}
