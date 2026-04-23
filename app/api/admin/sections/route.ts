import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { readDB, writeDB } from "@/lib/storage";

export async function GET(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await readDB();
  return NextResponse.json(db.sections);
}

export async function PATCH(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const db = await readDB();
  db.sections = { ...db.sections, ...body };
  await writeDB(db);
  return NextResponse.json(db.sections);
}
