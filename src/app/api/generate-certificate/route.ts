import { NextResponse } from 'next/server'
import { z } from 'zod'
import {
  findInternByEmail,
  updateInternCertificateKey,
  createInternRecord,
} from "@/lib/db";
import {
  generateCertificatePDF,
  validateCertificateData,
} from "@/lib/pdf-generator";
import {
  uploadPdfToS3,
  generateSignedUrl,
  generatePreviewUrl,
  certificateExists,
} from "@/lib/s3";
import { VerifiedEmailList } from "@/lib/utils";

// Request validation schema
const generateCertificateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  college: z
    .string()
    .min(1, "College is required")
    .max(200, "College name too long"),
  email: z.string().email("Invalid email format"),
});

export async function POST(request: Request) {
  try {
    console.log("🚀 Starting certificate generation process");

    // Parse and validate request body
    const body = await request.json();
    const validatedData = generateCertificateSchema.parse(body);

    console.log(
      `🔍 Processing certificate request for: ${validatedData.email}`
    );

    // Step 1: Check if student exists in database
    let intern = await findInternByEmail(validatedData.email);

    if (!intern) {
      // Step 2: If not in database, check VerifiedEmailList
      console.log(
        `🆕 No existing intern found. Checking authorization for new certificate...`
      );

      const isEmailVerified = VerifiedEmailList.includes(
        validatedData.email.toLowerCase().trim()
      );

      if (!isEmailVerified) {
        console.log(`❌ Email not in verified list: ${validatedData.email}`);
        return NextResponse.json(
          {
            error:
              "Email not authorized. Please contact support for assistance.",
          },
          { status: 404 }
        );
      }

      console.log(
        `✅ Email verified in authorized list: ${validatedData.email}`
      );

      // Step 3: Create new intern record for verified email
      console.log(`📝 Generating new certificate for: ${validatedData.email}`);
      intern = await createInternRecord(
        validatedData.name,
        validatedData.college,
        validatedData.email
      );
    } else {
      // Step 2: If found in database, verify provided details match records
      const nameMatches =
        intern.name.toLowerCase().trim() ===
        validatedData.name.toLowerCase().trim();
      const collegeMatches =
        intern.college.toLowerCase().trim() ===
        validatedData.college.toLowerCase().trim();

      if (!nameMatches || !collegeMatches) {
        console.log(
          `❌ Provided details don't match database records for: ${validatedData.email}`
        );
        return NextResponse.json(
          {
            error:
              "Provided details do not match our records. Please verify your name and college information.",
          },
          { status: 400 }
        );
      }

      console.log(
        `✅ Student details verified: ${intern.name} from ${intern.college}`
      );
    }

    // Step 3: Check if certificate already exists
    if (intern.certificateKey) {
      console.log(`🔄 Checking existing certificate: ${intern.certificateKey}`);

      try {
        const exists = await certificateExists(intern.certificateKey);

        if (exists) {
          // Generate new signed URLs for existing certificate
          console.log(
            `♻️  Certificate already exists, generating new download and preview links`
          );
          const downloadUrl = await generateSignedUrl(intern.certificateKey);
          const previewUrl = await generatePreviewUrl(intern.certificateKey);

          return NextResponse.json({
            success: true,
            message: "Certificate already exists. Download link generated.",
            downloadUrl,
            previewUrl,
            isExisting: true,
          });
        } else {
          console.log(
            `⚠️  Certificate key exists in DB but file not found in S3, regenerating...`
          );
        }
      } catch (error) {
        console.error(`⚠️  Error checking existing certificate:`, error);
        // Continue with generation if check fails
      }
    }

    // Step 4: Generate PDF certificate
    console.log(`📄 Generating PDF certificate for ${intern.name}`);

    const certificateData = {
      studentName: intern.name,
      collegeName: intern.college, // Changed from 'college' to 'collegeName'
      email: intern.email, // Added email field as required by new interface
    };

    // Validate the certificate data
    validateCertificateData(certificateData);

    // Generate the PDF
    const pdfBuffer = await generateCertificatePDF(certificateData);

    console.log(`✅ PDF generated successfully (${pdfBuffer.length} bytes)`);

    // Step 5: Upload PDF to S3
    console.log(`☁️  Uploading certificate to S3...`);
    const s3Key = await uploadPdfToS3(pdfBuffer, intern.email);

    console.log(`✅ Certificate uploaded to S3: ${s3Key}`);

    // Step 6: Update database with certificate key
    console.log(`💾 Updating database with certificate key...`);
    await updateInternCertificateKey(intern.email, s3Key);

    console.log(`✅ Database updated with certificate key`);

    // Step 7: Generate signed URLs for download and preview
    console.log(`🔗 Generating signed URLs for download and preview...`);
    const downloadUrl = await generateSignedUrl(s3Key, 3600); // 1 hour expiration
    const previewUrl = await generatePreviewUrl(s3Key, 3600); // 1 hour expiration

    console.log(`✅ Download and preview URLs generated (expires in 1 hour)`);

    // Step 8: Return success response
    console.log(
      `🎉 Certificate generation completed successfully for ${intern.name}`
    );

    return NextResponse.json({
      success: true,
      message: "Certificate generated successfully.",
      downloadUrl,
      previewUrl,
      certificateId: s3Key,
      studentName: intern.name,
      isExisting: false,
    });
  } catch (error) {
    console.error("❌ Error generating certificate:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );
      return NextResponse.json(
        {
          error: "Invalid input data",
          details: errorMessages,
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

    // Handle S3 errors
    if (
      error instanceof Error &&
      (error.message.includes("S3") ||
        error.message.includes("upload") ||
        error.message.includes("cloud storage"))
    ) {
      return NextResponse.json(
        {
          error: "Failed to upload certificate. Please try again later.",
        },
        { status: 503 }
      );
    }

    // Handle PDF generation errors
    if (error instanceof Error && error.message.includes("PDF")) {
      return NextResponse.json(
        {
          error: "Failed to generate certificate PDF. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while generating your certificate. Please try again later.",
      },
      { status: 500 }
    );
  }
} 