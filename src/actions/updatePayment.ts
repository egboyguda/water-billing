"use server";
import { z } from "zod";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const updatePaymentSchema = z.object({
  status: z.enum(["PAID", "UNPAID", "OVERDUE", "PARTIALLY_PAID", "VOIDED"]),
  remarks: z.string().optional(),
});

interface UpdatePaymentState {
  errors: {
    status?: string[];
    remarks?: string[];
    _form?: string[];
  };
}
export async function updatePaymentAction(
  billId: string,
  formState: UpdatePaymentState,
  formData: FormData
): Promise<UpdatePaymentState> {
  const result = updatePaymentSchema.safeParse({
    status: formData.get("status"),
    remarks: formData.get("remarks"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    console.log("cale");
    await db.bill.update({
      where: { id: billId },
      data: {
        status: result.data.status,
        remarks: result.data.remarks,
      },
    });
    revalidatePath("/billing");
  } catch (e) {
    if (e instanceof Error) {
      return { errors: { _form: [e.message] } };
    }
    return { errors: { _form: ["Something went wrong"] } };
  }
  return { errors: {} };
}
