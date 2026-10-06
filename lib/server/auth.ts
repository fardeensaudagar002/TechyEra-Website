/**
 * Admin sign-in: one shared password (ADMIN_PASSWORD) and a signed, HTTP-only session cookie.
 * Uses Web Crypto so the same code runs in middleware (edge) and in Node.
 */
export const SESSION_COOKIE = "ty_admin";
const SESSION_HOURS = 12;

const enc = new TextEncoder();
const secret = () => process.env.SESSION_SECRET || `techyera:${process.env.ADMIN_PASSWORD ?? ""}`;

async function hmac(value: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const adminConfigured = () => (process.env.ADMIN_PASSWORD ?? "").length >= 8;

export async function checkPassword(input: string) {
  if (!adminConfigured()) return false;
  // compare digests so timing does not reveal the password length
  return safeEqual(await hmac(`pw:${input}`), await hmac(`pw:${process.env.ADMIN_PASSWORD}`));
}

export async function createSessionToken() {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  return `${expires}.${await hmac(`session:${expires}`)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, await hmac(`session:${expires}`));
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production" && process.env.INSECURE_COOKIES !== "1",
  path: "/",
  maxAge: SESSION_HOURS * 3600,
};
