import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionPayload = {
  userId: string;
  expires: Date;
  role: string;
};
const key = new TextEncoder().encode(process.env.SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string, role: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expires, role });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
  if (role === "admin") {
    redirect("/");
  }
  redirect("/user");
}
