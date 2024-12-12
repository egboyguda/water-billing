"use server";
import { addDays, startOfMonth, endOfMonth } from "date-fns";
import { db } from "@/db"; // Your Prisma client
import { revalidatePath } from "next/cache";

const generateMonthlyBills = async () => {
  try {
    const currentDate = new Date();
    const startOfCurrentMonth = startOfMonth(currentDate);
    const endOfCurrentMonth = endOfMonth(currentDate);

    const allUsers = await db.user.findMany({
      where: {
        role: "CUSTOMER",
      },
    });
    const generatedBills = [];

    for (const user of allUsers) {
      const existingBill = await db.bill.findFirst({
        where: {
          userId: user.id,
          billingMonth: {
            gte: startOfCurrentMonth,
            lt: addDays(endOfCurrentMonth, 1),
          },
        },
      });

      if (!existingBill) {
        const newBill = await calculateBill(user.id, currentDate);
        if (newBill) {
          generatedBills.push(newBill);
        }
      }
    }

    return generatedBills;
  } catch (error) {
    console.error("Error generating monthly bills", error);
    return { success: false, message: "Failed to generate bills" }; // Return an error object
  }
};

const calculateBill = async (userId: string, billingDate: Date) => {
  try {
    const startOfBillingMonth = startOfMonth(billingDate);
    const endOfBillingMonth = endOfMonth(billingDate);

    const totalMonthlyUsage = await db.readingWater.aggregate({
      where: {
        userId,
        createdAt: {
          gte: startOfBillingMonth,
          lte: endOfBillingMonth,
        },
      },
      _sum: {
        waterUsage: true,
      },
    });

    const usage = totalMonthlyUsage._sum.waterUsage || 0;

    // Check if usage is zero
    if (usage === 0) {
      return null; // Return null if usage is zero
    }

    let amount = 0;
    const tier1Rate = 10;
    const tier2Rate = 15;

    if (usage <= 10) {
      amount = usage * tier1Rate;
    } else {
      amount = 10 * tier1Rate + (usage - 10) * tier2Rate;
    }

    const issueDate = new Date();
    const dueDate = addDays(issueDate, 7);
    const billingMonth = startOfMonth(billingDate);

    const newBill = await db.bill.create({
      data: {
        userId,
        amount,
        dueDate,
        status: "UNPAID", // Or BillStatus.UNPAID if you have the enum
        createdAt: issueDate,
        billingMonth,
      },
    });
    revalidatePath("/billing");
    return newBill;
  } catch (error) {
    console.error("Error calculating bill:", error);
    return { success: false, message: "Failed to calculate bill" }; // Return an error object
  }
};

export { generateMonthlyBills, calculateBill };
