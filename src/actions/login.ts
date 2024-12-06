"use server";
import { z } from "zod";
import { compareSync } from "bcrypt-ts";
import { db } from "@/db";
import { createSession } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
interface LoginState {
  errors: {
    username?: string[];
    password?: string[];
  };
}

export async function loginActions(
  formState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const result = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  //check if user exists
  const user = await db.user.findUnique({
    where: {
      username: result.data.username,
    },
  });
  if (!user) {
    return {
      errors: {
        username: ["username or password is incorrect"],
      },
    };
  }
  //check if password is correct
  if (!compareSync(result.data.password, user.password)) {
    return {
      errors: {
        password: ["username or password is incorrect"],
      },
    };
  }
  //create session
  console.log(compareSync(result.data.password, user.password));
  const userId = user.id.toString();
  await createSession(userId, user.role.toString());
  return {
    errors: {},
  };
}
