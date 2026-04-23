import { NextResponse } from "next/server";
import { readDB } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.projects);
}
