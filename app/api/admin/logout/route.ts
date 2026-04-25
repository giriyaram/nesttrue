import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(sessionCookieName());
  return res;
}
