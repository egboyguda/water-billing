import type { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

// Define the expected shape of the request body
interface ReadingData {
  totalMilliliters: number;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  let user: User | null = null;
  const data: ReadingData = await request.json();
  console.log(data);
  try {
    // Parse the request body as JSON and validate its shape

    console.log(data.totalMilliliters);
    // Check if a user exists with the specified API key
    user = await db.user.findFirst({
      where: {
        apiKey: {
          key: key, // Nested query to match the `key` field in the `ApiKey` relation
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "API key is invalid" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while validating the API key" },
      { status: 500 }
    );
  }
  try {
    // Create a new reading for the user
    console.log(user);
    const reading = await db.readingWater.create({
      data: {
        waterUsage: data.totalMilliliters,
        userId: user.id,
      },
    });
    revalidatePath("/user");

    return NextResponse.json({
      message: "Reading created successfully",
      reading,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while creating the reading" },
      { status: 500 }
    );
  }
}
