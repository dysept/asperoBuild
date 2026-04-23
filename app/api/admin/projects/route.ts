import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { readDB, writeDB, addProject, Project } from "@/lib/storage";

export async function GET(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const project = await addProject({
    title: body.title || "Новий проект",
    category: body.category || "Будівництво",
    area: body.area || "",
    duration: body.duration || "",
    city: body.city || "Львів",
    status: body.status || "Завершено",
    year: body.year || new Date().getFullYear().toString(),
    description: body.description || "",
    specs: body.specs || [],
    tags: body.tags || [],
    image: null,
    gallery: [],
    featured: body.featured ?? false,
  });
  return NextResponse.json(project, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Partial<Project> & { id: string };
  const db = await readDB();
  const idx = db.projects.findIndex((p) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { id: _id, ...updates } = body;
  db.projects[idx] = { ...db.projects[idx], ...updates };
  await writeDB(db);
  return NextResponse.json(db.projects[idx]);
}

export async function DELETE(request: NextRequest) {
  if (!getSessionFromRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await request.json();
  const db = await readDB();
  const initial = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length === initial) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeDB(db);
  return NextResponse.json({ ok: true });
}
