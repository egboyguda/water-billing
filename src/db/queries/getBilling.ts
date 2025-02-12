import { db } from "@/db";
import { verifySession } from "@/lib/dal";

import { startOfMonth, endOfMonth } from "date-fns";
import { BillStatus } from "@prisma/client";
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

export const filterBillsActions = async (status: BillStatus, term: string) => {
  const session = await verifySession();
  if (!session?.userId) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const bills = await db.bill.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                user: {
                  username: { contains: term, mode: "insensitive" },
                },
              },
              {
                user: {
                  profile: {
                    name: { contains: term, mode: "insensitive" },
                  },
                },
              },
            ],
          },
          ...(status && status in BillStatus ? [{ status }] : []), // Conditionally add status filter
        ],
      },
      include: {
        user: {
          include: {
            profile: {
              select: {
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
          profileName: bill.user.profile?.name || "No Profile",
        };
      })
    );

    return { success: true, bills: billsWithUsageAndProfileName };
  } catch (error) {
    console.error("Error filtering bills:", error);
    return { success: false, message: "Error filtering bills" };
  }
};
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

//get pending payments
export const getPendingPaymentCount = async () => {
  try {
    const session = await verifySession();

    if (!session?.userId) {
      return { success: false, message: "User not authenticated" };
    }

    const userId = session.userId;
    const userRole = session.role;

    let pendingCount = 0;

    if (userRole === "CUSTOMER") {
      pendingCount = await db.bill.count({
        where: {
          userId,
          status: "UNPAID", // Or BillStatus.UNPAID if using an enum
        },
      });
    } else {
      pendingCount = await db.bill.count({
        where: {
          status: "UNPAID", // Or BillStatus.UNPAID if using an enum
        },
      });
    }

    return { success: true, count: pendingCount };
  } catch (error) {
    console.error("Error getting pending payment count:", error);
    return { success: false, message: "Error getting pending payment count" };
  }
};

//get cost
export const getCostPerCubic = async () => {
  try {
    const cost = await db.cost.findFirst();
    return cost;
  } catch (error) {
    console.error("Error getting cost per cubic:", error);
    return null;
  }
};
export const getTotalBillAmount = async () => {
  // Verify the session
  const session = await verifySession();
  if (!session) return null;

  // Get the user's ID from the session

  // Query the total bill amount for the authenticated user
  const totalBillAmount = await db.bill.aggregate({
    _sum: {
      amount: true,
    },
  });

  // Return the total amount (or 0 if no bills are found)
  return totalBillAmount._sum.amount || 0;
};

export const getBillingSummaryForCurrentMonth = async () => {
  // Get the current date and calculate the start and end of the month
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  // Query total billing and total PAID billing for the current month
  const totalBilling = await db.bill.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      billingMonth: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  const totalPaidBilling = await db.bill.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      billingMonth: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      status: "PAID",
    },
  });

  // Return both results in a single object
  return {
    totalBilling: totalBilling._sum.amount || 0,
    totalPaidBilling: totalPaidBilling._sum.amount || 0,
  };
};

export const getMonthlyBillingForCurrentYear = async () => {
  const currentYear = new Date().getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Query the database for billing grouped by month
  const monthlyBilling = await db.bill.groupBy({
    by: ["billingMonth"], // Group by the `billingMonth` field
    _sum: {
      amount: true, // Sum up the `amount` field
    },
    where: {
      billingMonth: {
        gte: new Date(`${currentYear}-01-01`), // Start of the year
        lte: new Date(`${currentYear}-12-31`), // End of the year
      },
    },
  });

  // Initialize an array with all months and set billing to 0 by default
  const result = months.map((month) => ({
    month,
    billing: 0,
  }));

  // Populate the result array with actual billing data
  monthlyBilling.forEach(({ billingMonth, _sum }) => {
    const monthIndex = new Date(billingMonth).getMonth(); // Get the month index
    result[monthIndex].billing = _sum.amount || 0;
  });

  return result;
};
