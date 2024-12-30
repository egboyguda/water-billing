"use server";

import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const userSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z ]*$/, {
      message: "Username must be between 2 and 30 characters long",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters") // Increased minimum length
    .max(100, "Password cannot exceed 100 characters") // Added max length
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    }),

  password1: z
    .string()
    .min(8, "Password must be at least 8 characters") // Increased minimum length
    .max(100, "Password cannot exceed 100 characters") // Added max length
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    }),
  category: z.enum(["ADMIN", "MANAGER", "COLLECTOR"]),
});

interface UserState {
  errors: {
    username?: string[];
    password?: string[];
    password1?: string[];
    category?: string[];
    _form?: string[];
  };
}
export async function addUserAction(
  formState: UserState,
  formData: FormData
): Promise<UserState> {
  const result = userSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    password1: formData.get("password1"),
    category: formData.get("category"),
  });
  console.log(formData.get("category"));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  if (result.data.password !== result.data.password1) {
    return {
      errors: {
        password: ["Passwords do not match"],
      },
    };
  }
  try {
    await db.user.create({
      data: {
        username: result.data.username,
        password: hashSync(result.data.password),
        role: result.data.category,
      },
    });

    revalidatePath("/customer");
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["Something went wrong"] } };
  }
  return {
    errors: {},
  };
}
