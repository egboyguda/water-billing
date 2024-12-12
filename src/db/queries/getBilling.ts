import { db } from "@/db";
import { verifySession } from "@/lib/dal";
import { startOfMonth, endOfMonth } from "date-fns";

interface BillWithUsageAndProfileName {
  // Correct Interface
  id: string;
  userId: string;
  amount: number;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  billingMonth: Date;
  totalUsage: number;
  profileName: string; // Include profileName
}

interface BillingResult {
  success: boolean;
  message?: string;
  bills?: BillWithUsageAndProfileName[]; // Correct type here
}

export const getBillingUser = async (): Promise<BillingResult> => {
  try {
    const session = await verifySession();

    if (!session?.userId) {
      return { success: false, message: "User not authenticated" };
    }

    const userId = session.userId;
    const bills = await db.bill.findMany({
      where: { userId },
      orderBy: [{ dueDate: "asc" }, { status: "asc" }],
      include: {
        // Include user and profile
        user: {
          include: {
            profile: { select: { name: true } },
          },
        },
      },
    });

    const billsWithUsageAndProfileName = await Promise.all(
      bills.map(async (bill) => {
        const start = startOfMonth(bill.billingMonth);
        const end = endOfMonth(bill.billingMonth);

        const aggregateResult = await db.readingWater.aggregate({
          where: { userId, createdAt: { gte: start, lte: end } },
          _sum: { waterUsage: true },
        });

        const totalUsage = aggregateResult._sum?.waterUsage || 0;

        return {
          ...bill,
          totalUsage,
          profileName: bill.user.profile?.name || "No Profile", // Add profileName
        };
      })
    );

    return { success: true, bills: billsWithUsageAndProfileName };
  } catch (error) {
    console.error("Error getting user bills:", error);
    return { success: false, message: "Error getting user bills" };
  }
};
export const getAllBillsWithUsageAndProfileName = async () => {
  try {
    const bills = await db.bill.findMany({
      orderBy: [{ dueDate: "asc" }, { status: "asc" }],
      include: {
        user: {
          include: {
            // Include the profile
            profile: {
              select: {
                // Select only the name
                name: true,
              },
            },
          },
        },
      },
    });

    const billsWithUsageAndProfileName = await Promise.all(
      bills.map(async (bill) => {
        const start = startOfMonth(bill.billingMonth);
        const end = endOfMonth(bill.billingMonth);

        const aggregateResult = await db.readingWater.aggregate({
          where: {
            userId: bill.userId,
            createdAt: {
              gte: start,
              lte: end,
            },
          },
          _sum: {
            waterUsage: true,
          },
        });

        const totalUsage = aggregateResult._sum?.waterUsage || 0;

        return {
          ...bill,
          totalUsage,
          profileName: bill.user.profile?.name || "No Profile", // Get profile name or default
        };
      })
    );

    return { success: true, bills: billsWithUsageAndProfileName };
  } catch (error) {
    console.error("Error getting all bills with usage and profile name", error);
    return {
      success: false,
      message: "Error getting all bills with usage and profile name",
    };
  }
};
