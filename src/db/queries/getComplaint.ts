import { db } from "..";
import { verifySession } from "@/lib/dal";

export const getComplaint = async () => {
  try {
    const session = await verifySession();
    if (!session) return null;

    if (session.role === "ADMIN" || session.role === "MANAGER") {
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

export const getComplaintCountsByStatus = async () => {
  // Group complaints by status and count them
  const complaintCounts = await db.complaint.groupBy({
    by: ["status"], // Group by the `status` field
    _count: {
      status: true, // Count the number of complaints for each status
    },
  });

  // Convert the result into a more readable format
  const result = {
    pending: 0,
    resolved: 0,
  };

  complaintCounts.forEach((item) => {
    if (item.status === "PENDING") {
      result.pending = item._count.status;
    } else if (item.status === "RESOLVED") {
      result.resolved = item._count.status;
    }
  });

  return result;
};
