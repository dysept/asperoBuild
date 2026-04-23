import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const COOKIE_NAME = "aspero_admin_session";
export const SESSION_VALUE =
  process.env.SESSION_TOKEN || "aspero-admin-v1-2024";
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "aspero2024";

export function checkPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// For middleware (Edge Runtime) — no crypto needed
export function getSessionFromRequest(request: NextRequest): boolean {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return token === SESSION_VALUE;
}

// For Server Components / Route Handlers
export async function getServerSession(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token === SESSION_VALUE;
}
