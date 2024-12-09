import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./auth";

import { cache } from "react";

//cache para one time call la
//sa db
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }
  return { isAuth: true, userId: String(session?.userId), role: session?.role };
});
