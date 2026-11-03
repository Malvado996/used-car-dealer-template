import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-session";

/** Defense in depth: verify the session server-side in admin layouts/pages. */
export async function requireAdmin() {
  const session = await verifySessionToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  return session;
}
