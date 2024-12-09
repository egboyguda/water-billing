import { db } from "..";
import { verifySession } from "@/lib/dal";

export const getComplaint = async () => {
  try {
    const session = await verifySession();
    if (!session) return null;

    if (session.role === "ADMIN") {
      // Return all complaints for admin
      return await db.complaint.findMany({
        include: { profile: { select: { name: true } } },
      });
    }

    // Non-admin user: Find profile by userId
    const profile = await db.profile.findUnique({
      where: {
        userId: session.userId,
      },
    });

    if (!profile) return null;

    // Return complaints associated with the user's profile
    return await db.complaint.findMany({
      where: {
        profileId: profile.id,
      },
      include: { profile: { select: { name: true } } },
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return null;
  }
};

export const getAllComplaints = async () => {
  const session = await verifySession();
  if (!session) return null;
  const complaints = await db.complaint.findMany();
  return complaints;
};
