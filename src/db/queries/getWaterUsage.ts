import { verifySession } from "@/lib/dal";
import { db } from "..";

// Define the type for the result of the raw query

export const getTotalWaterUsage = async () => {
  const session = await verifySession();
  if (!session) return null;
  const totalWaterUsage = await db.readingWater.aggregate({
    _sum: {
      waterUsage: true,
    },
  });
  return totalWaterUsage._sum.waterUsage || 0;
};
export const getCurrentWaterUsage = async () => {
  const session = await verifySession();

  if (!session) return null;

  // Get today's start and end timestamps
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Calculate the total water usage for the current day
  const totalWaterUsage = await db.readingWater.aggregate({
    _sum: {
      waterUsage: true, // Sum the waterUsage field
    },
    where: {
      createdAt: {
        gte: startOfDay, // Greater than or equal to start of day
        lte: endOfDay, // Less than or equal to end of day
      },
      userId: session.userId, // Filter by the logged-in user's ID
    },
  });
  console.log(totalWaterUsage._sum.waterUsage);
  return {
    totalWaterUsage: totalWaterUsage._sum.waterUsage, // Return 0 if no data
  };
};

export const getWaterUsageForLastFiveMonths = async () => {
  const session = await verifySession();

  if (!session) return null;

  // Get today's date
  const today = new Date();

  // Array to hold start dates of the last 5 months (including the current month)
  const months = [];

  // Loop to create start dates for the last 5 months (including the current month)
  for (let i = 0; i < 5; i++) {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1); // First day of the month
    months.push(startOfMonth);
  }

  // Array to store the total water usage for each month
  const monthlyUsage = [0, 0, 0, 0, 0];

  // Loop through each month and fetch the water usage
  for (let i = 0; i < months.length; i++) {
    const startOfMonth = months[i];
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Set the end to the first day of the next month

    // Fetch water usage data for the current month
    const waterUsageData = await db.readingWater.findMany({
      where: {
        createdAt: {
          gte: startOfMonth, // Start of the month
          lte: endOfMonth, // End of the month
        },
        userId: session.userId, // User filter
      },
      orderBy: {
        createdAt: "asc", // Order by creation date ascending
      },
    });

    // Calculate the total water usage for this month
    const totalWaterUsage = waterUsageData.reduce(
      (sum, entry) => sum + entry.waterUsage,
      0
    );

    // Store the result in the corresponding monthlyUsage array
    monthlyUsage[i] = totalWaterUsage;
  }

  // Dynamically generate month names for the last 5 months
  const monthNames = months.map((month) =>
    month.toLocaleString("default", { month: "long" })
  );

  // Create result array with month names and corresponding water usage
  const result = months.map((startOfMonth, index) => ({
    month: monthNames[index], // Dynamic month name
    waterUsage: monthlyUsage[index],
  }));

  console.log("Final result for the last 5 months:", result);

  return result;
};

export const getWaterUsageForLastFiveMonthsAdmin = async () => {
  const session = await verifySession();

  if (!session) return null;

  // Get today's date
  const today = new Date();

  // Array to hold start dates of the last 5 months (including the current month)
  const months = [];

  // Loop to create start dates for the last 5 months (including the current month)
  for (let i = 0; i < 5; i++) {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1); // First day of the month
    months.push(startOfMonth);
  }

  // Array to store the total water usage for each month
  const monthlyUsage = [0, 0, 0, 0, 0];

  // Check if the user is an admin
  const isAdmin = session.role === "ADMIN";

  // Loop through each month and fetch the water usage
  for (let i = 0; i < months.length; i++) {
    const startOfMonth = months[i];
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1); // Set the end to the first day of the next month

    // Fetch water usage data for the current month
    let waterUsageData;
    if (isAdmin) {
      // If admin, fetch all user data
      waterUsageData = await db.readingWater.findMany({
        where: {
          createdAt: {
            gte: startOfMonth, // Start of the month
            lte: endOfMonth, // End of the month
          },
        },
        orderBy: {
          createdAt: "asc", // Order by creation date ascending
        },
      });
    } else {
      // If not admin, fetch only the user's data
      waterUsageData = await db.readingWater.findMany({
        where: {
          createdAt: {
            gte: startOfMonth, // Start of the month
            lte: endOfMonth, // End of the month
          },
          userId: session.userId, // User filter
        },
        orderBy: {
          createdAt: "asc", // Order by creation date ascending
        },
      });
    }

    // Calculate the total water usage for this month
    const totalWaterUsage = waterUsageData.reduce(
      (sum, entry) => sum + entry.waterUsage,
      0
    );

    // Store the result in the corresponding monthlyUsage array
    monthlyUsage[i] = totalWaterUsage;
  }

  // Dynamically generate month names for the last 5 months
  const monthNames = months.map((month) =>
    month.toLocaleString("default", { month: "long" })
  );

  // Create result array with month names and corresponding water usage
  const result = months.map((startOfMonth, index) => ({
    month: monthNames[index], // Dynamic month name
    waterUsage: monthlyUsage[index],
  }));

  console.log("Final result for the last 5 months:", result);

  return result;
};
