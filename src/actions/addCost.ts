"use server";

import { z } from "zod";
import { db } from "@/db";
import { verifySession } from "@/lib/dal";

const addCostSchema = z.object({
  cost: z.number().min(0, "Cost must be a non-negative number"),
});

interface SetCostPerCubicData {
  errors: {
    cost?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function AddCost(
  formState: SetCostPerCubicData,
  formData: FormData
): Promise<SetCostPerCubicData> {
  const session = await verifySession();

  if (!session?.userId) {
    return {
      errors: { _form: ["You must be logged in to perform this action."] },
    };
  }

  const result = addCostSchema.safeParse({
    cost: Number(formData.get("cost")),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if a cost record already exists
    const existingCost = await db.cost.findFirst();

    if (existingCost) {
      // Update the existing record
      await db.cost.update({
        where: { id: existingCost.id },
        data: { costperMeter: result.data.cost },
      });
    } else {
      // Create a new record with a UUID
      await db.cost.create({
        data: { costperMeter: result.data.cost },
      });
    }

    return { errors: {}, success: true };
  } catch (error) {
    console.error("Error updating cost per cubic:", error);
    return {
      errors: { _form: ["Failed to update cost per cubic."] },
    };
  }
}
