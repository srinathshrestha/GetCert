import { NextResponse } from "next/server";
import { findInternByEmail } from "@/lib/db";
import { z } from "zod";

// Request validation schema
const verifyStudentSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = verifyStudentSchema.parse(body);

    console.log(`🔍 Verifying student email: ${validatedData.email}`);

    // Find intern by email in the database
    const intern = await findInternByEmail(validatedData.email);

    if (!intern) {
      console.log(`❌ Student not found: ${validatedData.email}`);
      return NextResponse.json(
        {
          error: "Email not registered. Please contact support for assistance.",
          verified: false,
        },
        { status: 404 }
      );
    }

    console.log(`✅ Student verified: ${intern.name} from ${intern.college}`);

    // Return student details (excluding sensitive information)
    return NextResponse.json({
      verified: true,
      student: {
        id: intern.id,
        name: intern.name,
        college: intern.college,
        email: intern.email,
        field: intern.field,
        startDate: intern.startDate.toISOString(),
        endDate: intern.endDate.toISOString(),
        hasExistingCertificate: !!intern.certificateKey,
      },
    });
  } catch (error) {
    console.error("❌ Error verifying student:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid email format",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle database connection errors
    if (error instanceof Error && error.message.includes("database")) {
      return NextResponse.json(
        {
          error: "Database connection failed. Please try again later.",
        },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
