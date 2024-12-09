import { verifySession } from "@/lib/dal";
import { db } from "..";

export const getCustomerCount = async () => {
  const session = await verifySession();
  if (!session) return null;
  const count = await db.user.count({
    where: {
      role: "CUSTOMER",
    },
  });
  return count;
};

export const getCustomer = async () => {
  try {
    const session = await verifySession();
    if (!session) return null; // Return null if no session

    // GET ALL CUSTOMER
    const customers = await db.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      select: {
        id: true,
        profile: { select: { name: true, address: true, phoneNumber: true } },
      },
    });

    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return null; // Return null in case of an error
  }
};
