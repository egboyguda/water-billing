"use server";

import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { db } from "@/db";

const userSchema = z.object({
  //add a regex

  email: z
    .string()
    .email()
    .regex(/@example.com/, { message: "Invalid email" }),
  password: z
    .string()
    .min(4)
    .regex(/^[a-zA-Z0-9]{3,30}$/, {
      message: "Password must be between 4 and 30 characters long",
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
  phone: z
    .string()
    .min(10)
    .max(10)
    .regex(/^[0-9]*$/, {
      message: "Phone number must be between 10 and 10 characters long",
    }),
  //address
  address: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Z ]*$/, {
      message: "Address must be between 2 and 30 characters long",
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
    phone?: string[];
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
    phone: formData.get("phone"),
    address: formData.get("address"),
    username: formData.get("username"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
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
        phoneNumber: result.data.phone,
      },
    });
  } catch (error) {
    return { errors: { _form: ["User already exists"] } };
  }

  return {
    errors: {},
  };
}
