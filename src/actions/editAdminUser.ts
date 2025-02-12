"use server";
import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const AdminSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z ]*$/, { message: "Invalid username format" }),
  password: z
    .string()
    .nullable() // Important: Use nullable for optional fields with refinements
    .superRefine((val, ctx) => {
      if (val === null || val === "") return; // Skip if null or empty string
      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Password must be at least 8 characters",
        });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one lowercase letter",
        });
      }
    }),
  password1: z
    .string()
    .nullable() // Important: Use nullable for optional fields with refinements
    .superRefine((val, ctx) => {
      if (val === null || val === "") return; // Skip if null or empty string
      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Password must be at least 8 characters",
        });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one lowercase letter",
        });
      }
    }),
  category: z.enum(["ADMIN", "MANAGER", "COLLECTOR"]),
});
interface AdminState {
  errors: {
    username?: string[];
    password?: string[];
    password1?: string[];
    category?: string[];
    _form?: string[];
  };
}

export async function editAdminUserAction(
  userId: string,
  formState: AdminState,
  formData: FormData
): Promise<AdminState> {
  const result = AdminSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    password1: formData.get("password1"),
    category: formData.get("category"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  if (result.data.password && result.data.password !== result.data.password1) {
    return {
      errors: {
        password: ["Passwords do not match"],
        password1: ["Passwords do not match"],
      },
    };
  }
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        username: result.data.username,
        role: result.data.category,
        ...(result.data.password
          ? { password: hashSync(result.data.password) }
          : {}),
      },
    });
    revalidatePath("/add");
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
