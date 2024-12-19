"use server";
import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

// Regular expression for validating phone numbers
const phoneRegex = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
);

const CustomerSchema = z.object({
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
  email: z.string().email("Invalid email format"),
  contactNum: z.string().regex(phoneRegex, "Invalid phone number format"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
});

interface CustomerState {
  errors: {
    username?: string[];
    password?: string[];
    password1?: string[];
    email?: string[];
    address?: string[];
    contactNum?: string[];
    name?: string[];
    _form?: string[];
  };
}

export async function editUserAction(
  userId: string,
  formState: CustomerState,
  formData: FormData
): Promise<CustomerState> {
  const result = CustomerSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    password1: formData.get("password1"),
    email: formData.get("email"),
    contactNum: formData.get("contactNum"),
    address: formData.get("address"),
    name: formData.get("name"),
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
        email: result.data.email,

        ...(result.data.password
          ? { password: hashSync(result.data.password) }
          : {}),
        profile: {
          update: {
            name: result.data.name,
            phoneNumber: result.data.contactNum,
            address: result.data.address,
          },
        },
      },
    });
    revalidatePath("/customer");
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }
    return { errors: { _form: ["Something went wrong"] } };
  }

  return { errors: {} };
}

export async function deleteUserAction(userId: string) {
  await db.user.delete({
    where: {
      id: userId,
    },
  });
  revalidatePath("/customer");
}
