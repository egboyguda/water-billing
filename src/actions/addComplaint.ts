"use server";

import { z } from "zod";
import { db } from "@/db";
import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";

const ComplaintSchema = z.object({
  name: z.string(),
  description: z.string(),
});

interface AddComplaintState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function ComplainActions(
  formState: AddComplaintState,
  formData: FormData
): Promise<AddComplaintState> {
  const session = await verifySession();
  const result = ComplaintSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  if (!session) {
    return {
      errors: {
        _form: ["Please login first"],
      },
    };
  }
  //find the profile with the userId
  //and save the data
  const profile = await db.profile.findUnique({
    where: {
      userId: session.userId,
    },
  });
  if (!profile) {
    return {
      errors: {
        _form: ["Please login first"],
      },
    };
  }
  await db.complaint.create({
    data: {
      profileId: profile.id,
      name: result.data.name,
      description: result.data.description,
      status: "PENDING",
    },
  });
  revalidatePath("/user/complaint");
  revalidatePath("/user");
  revalidatePath("/");
  revalidatePath("/complaint");
  return {
    errors: {},
  };
}
