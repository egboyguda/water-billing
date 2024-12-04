"use server";
import { z } from "zod";
import { compareSync } from "bcrypt-ts";
import { db } from "@/db";
const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
interface LoginState {
  errors: {};
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
        username: "username or password is incorrect",
      },
    };
  }
  //check if password is correct
  if (!compareSync(result.data.password, user.password)) {
    return {
      errors: {
        password: "username or password is incorrect",
      },
    };
  }
  //create session

  return {
    errors: {},
  };
}
