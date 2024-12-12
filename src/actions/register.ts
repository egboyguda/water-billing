"use server";

import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { db } from "@/db";

const userSchema = z.object({
  //add a regex

  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters") // Increased minimum length
    .max(100, "Password cannot exceed 100 characters") // Added max length
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password), {
      message: "Password must contain at least one special character",
    }),
  password1: z
    .string()
    .min(8, "Password must be at least 8 characters") // Increased minimum length
    .max(100, "Password cannot exceed 100 characters") // Added max length
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password), {
      message: "Password must contain at least one special character",
    }),
  //name show have regex
  // space allowed
  //any character that accpeted tobe name
  name: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z ]*$/, {
      message: "Name must be between 2 and 30 characters long",
    }),
  //phone number
  contact: z
    .string()
    .min(10)
    .max(14)
    .regex(/^[0-9]*$/, {
      message: "Phone number must be between 10 and 10 characters long",
    }),
  //address
  address: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[a-zA-Z .]*$/, {
      message: "Address can only contain letters, spaces, and periods.",
    }),
  username: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z ]*$/, {
      message: "Username must be between 2 and 30 characters long",
    }),
});

interface UserState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    contact?: string[];
    address?: string[];
    _form?: string[];
    username?: string[];
  };
}
export async function registerAction(
  formState: UserState,
  formData: FormData
): Promise<UserState> {
  const result = userSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    contact: formData.get("contact"),
    address: formData.get("address"),
    username: formData.get("username"),
    password1: formData.get("password1"),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
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
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashSync(result.data.password),
        role: "CUSTOMER",
        username: result.data.username,
      },
      select: {
        id: true,
      },
    });
    await db.profile.create({
      data: {
        userId: user.id,
        name: result.data.name,
        address: result.data.address,
        phoneNumber: result.data.contact,
      },
    });
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
