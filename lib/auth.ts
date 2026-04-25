import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme";
const SESSION_COOKIE = "nesttrue_admin";

export async function validateAdminPassword(password: string): Promise<boolean> {
  return password === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === "authenticated";
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}
