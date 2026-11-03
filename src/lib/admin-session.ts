/**
 * Starter single-admin session: an HMAC-SHA256 signed token "<payloadB64url>.<sigB64url>"
 * where payload = { email, exp }. Uses Web Crypto only, so it runs in middleware (edge) and Node.
 * Replace with a real auth provider before production.
 */
export const ADMIN_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type AdminSession = { email: string; exp: number };

const enc = new TextEncoder();

function b64url(bytes: Uint8Array) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(str: string) {
  const s = atob(str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return secret;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

/** Constant-time string compare (compares HMAC digests so length isn't leaked either). */
export async function safeEqual(a: string, b: string) {
  const key = await hmacKey("admin-compare");
  const [da, db] = await Promise.all([
    crypto.subtle.sign("HMAC", key, enc.encode(a)),
    crypto.subtle.sign("HMAC", key, enc.encode(b)),
  ]);
  const x = new Uint8Array(da);
  const y = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export async function createSessionToken(email: string) {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set (16+ chars)");
  const payload: AdminSession = { email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(body));
  return `${body}.${b64url(new Uint8Array(sig))}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<AdminSession | null> {
  const secret = getSecret();
  if (!token || !secret) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body))) as AdminSession;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    if (payload.email !== process.env.ADMIN_EMAIL) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Only allow same-site relative paths under /admin for ?next= redirects. */
export function safeNext(next: unknown) {
  if (typeof next !== "string" || !next.startsWith("/admin") || next.startsWith("//") || next.startsWith("/admin/login"))
    return "/admin";
  return next;
}
