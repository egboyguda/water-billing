import { verifySession } from "@/lib/dal";
import type { ApiKey, Profile, User } from "@prisma/client";
import { db } from "..";

// Define the precise return type
export type SearchedCustomer = {
  id: string;
  username: string;
  email: string;
  apiKey: { key: string } | null; // Handle potential null apiKey
  profile: {
    name: string | null; // Handle potential null profile fields
    address: string | null;
    phoneNumber: string | null;
  } | null; // Handle potential null profile
};

export async function searchCustomer(
  term: string
): Promise<SearchedCustomer[]> {
  // Explicit return type
  const trimmedTerm = term.trim();

  if (!trimmedTerm) {
    return [];
  }

  try {
    const results = await db.user.findMany({
      where: {
        OR: [
          { username: { contains: trimmedTerm, mode: "insensitive" } },
          { profile: { name: { contains: trimmedTerm, mode: "insensitive" } } },
          {
            profile: {
              phoneNumber: { contains: trimmedTerm, mode: "insensitive" },
            },
          },
          {
            profile: {
              address: { contains: trimmedTerm, mode: "insensitive" },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        apiKey: { select: { key: true } },
        profile: { select: { name: true, address: true, phoneNumber: true } },
      },
    });

    return results as SearchedCustomer[]; // Type assertion for clarity
  } catch (error) {
    console.error("Error searching customers:", error);
    throw error; // Re-throw the error after logging
  }
}

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
        username: true,
        email: true,
        apiKey: { select: { key: true } },

        profile: { select: { name: true, address: true, phoneNumber: true } },
      },
    });

    return customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return null; // Return null in case of an error
  }
};
