"use server";
import { z } from "zod";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const updateComplaintSchema = z.object({
  status: z.enum(["PENDING", "RESOLVED"]),
  remarks: z.string().optional(),
});

interface UpdateComplaintState {
  errors: {
    status?: string[];
    remarks?: string[];
    _form?: string[];
  };
}
export async function updateComplaintAction(
  Id: string,
  formState: UpdateComplaintState,
  formData: FormData
): Promise<UpdateComplaintState> {
  const result = updateComplaintSchema.safeParse({
    status: formData.get("status"),
    remarks: formData.get("remarks"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    await db.complaint.update({
      where: { id: Id },
      data: {
        status: result.data.status,
        remarks: result.data.remarks,
      },
    });
    revalidatePath("/complaint");
  } catch (e) {
    if (e instanceof Error) {
      return { errors: { _form: [e.message] } };
    }
    return { errors: { _form: ["Something went wrong"] } };
  }
  return {
    errors: {},
  };
}
