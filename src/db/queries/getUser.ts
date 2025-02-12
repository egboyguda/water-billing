import { verifySession } from "@/lib/dal";
import { cache } from "react";
import { db } from "..";

export type UserData = {
  id: string;
  username: string;

  role: string;
};

interface UserResult {
  message?: string;
  users?: UserData[];
  success?: boolean;
}

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.userId,
    },
    select: {
      role: true,
    },
  });
  return user;
});

export const getUserAdminManagerCollector = async (): Promise<UserResult> => {
  try {
    const session = await verifySession();

    if (!session?.userId) {
      return {
        message: "User not authenticated.",
      };
    }

    if (session.role !== "ADMIN" && session.role !== "MANAGER") {
      return {
        message: "You are not authorized to perform this action.",
      };
    }

    const users = await db.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "MANAGER", "COLLECTOR"],
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
      orderBy: {
        username: "asc",
      },
    });

    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      users: [],
      message: "Failed to fetch users.",
    };
  }
};

export const searchUser = async (term: string): Promise<UserData[]> => {
  try {
    const session = await verifySession();

    if (!session?.userId) {
      throw new Error("User not authenticated.");
    }

    if (session.role !== "ADMIN" && session.role !== "MANAGER") {
      throw new Error("You are not authorized to perform this action.");
    }

    const users = await db.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
      orderBy: {
        username: "asc",
      },
    });

    return users as UserData[]; // Ensure it matches the UserData type
  } catch (error) {
    console.error("Error searching for users:", error);
    throw error; // Let the caller handle the error
  }
};
