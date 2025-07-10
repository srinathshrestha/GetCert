import PDFDocument from "pdfkit";
import { format } from "date-fns";

interface CertificateData {
  studentName: string;
  college: string;
  field: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Generate a professional internship certificate PDF
 * @param data - Certificate data including student details
 * @returns Promise<Buffer> - PDF buffer
 */
export async function generateCertificatePDF(
  data: CertificateData
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });

      // Buffer to store PDF data
      const buffers: Buffer[] = [];
      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on("error", reject);

      // Document dimensions (A4 landscape)
      const pageWidth = 842;
      const pageHeight = 595;
      const centerX = pageWidth / 2;

      // Colors (using our theme)
      const primaryColor = "#9333ea"; // Primary color from theme
      const accentColor = "#6366f1"; // Accent color
      const textColor = "#1f2937"; // Foreground text

      // Add decorative border
      doc
        .rect(20, 20, pageWidth - 40, pageHeight - 40)
        .strokeColor(primaryColor)
        .lineWidth(3)
        .stroke();

      // Add inner border
      doc
        .rect(35, 35, pageWidth - 70, pageHeight - 70)
        .strokeColor(primaryColor)
        .lineWidth(1)
        .stroke();

      // Header: Certificate Title
      doc
        .fontSize(48)
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .text("CERTIFICATE OF COMPLETION", centerX, 80, {
          align: "center",
          width: pageWidth - 100,
        });

      // Subtitle
      doc
        .fontSize(24)
        .fillColor(accentColor)
        .font("Helvetica")
        .text("Internship Program", centerX, 140, {
          align: "center",
          width: pageWidth - 100,
        });

      // Decorative line
      doc
        .moveTo(centerX - 150, 180)
        .lineTo(centerX + 150, 180)
        .strokeColor(primaryColor)
        .lineWidth(2)
        .stroke();

      // Main certificate text
      const currentY = 220;
      doc
        .fontSize(18)
        .fillColor(textColor)
        .font("Helvetica")
        .text("This is to certify that", centerX, currentY, {
          align: "center",
          width: pageWidth - 100,
        });

      // Student name (highlighted)
      doc
        .fontSize(36)
        .fillColor(primaryColor)
        .font("Helvetica-Bold")
        .text(data.studentName, centerX, currentY + 40, {
          align: "center",
          width: pageWidth - 100,
        });

      // Institution info
      doc
        .fontSize(18)
        .fillColor(textColor)
        .font("Helvetica")
        .text(`from ${data.college}`, centerX, currentY + 90, {
          align: "center",
          width: pageWidth - 100,
        });

      // Completion text
      doc
        .fontSize(18)
        .fillColor(textColor)
        .text(
          "has successfully completed the internship program in",
          centerX,
          currentY + 125,
          {
            align: "center",
            width: pageWidth - 100,
          }
        );

      // Field of internship
      doc
        .fontSize(24)
        .fillColor(accentColor)
        .font("Helvetica-Bold")
        .text(data.field, centerX, currentY + 160, {
          align: "center",
          width: pageWidth - 100,
        });

      // Duration information
      const startDateFormatted = format(data.startDate, "MMMM dd, yyyy");
      const endDateFormatted = format(data.endDate, "MMMM dd, yyyy");

      doc
        .fontSize(16)
        .fillColor(textColor)
        .font("Helvetica")
        .text(
          `Duration: ${startDateFormatted} to ${endDateFormatted}`,
          centerX,
          currentY + 200,
          {
            align: "center",
            width: pageWidth - 100,
          }
        );

      // Certificate date and ID
      const certificateDate = format(new Date(), "MMMM dd, yyyy");
      const certificateId = `CERT-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      // Date issued (bottom left)
      doc
        .fontSize(12)
        .fillColor(textColor)
        .font("Helvetica")
        .text(`Date Issued: ${certificateDate}`, 80, pageHeight - 120);

      // Certificate ID (bottom right)
      doc
        .fontSize(12)
        .fillColor(textColor)
        .text(
          `Certificate ID: ${certificateId}`,
          pageWidth - 280,
          pageHeight - 120
        );

      // Signature line and authority
      const signatureY = pageHeight - 160;

      // Signature line
      doc
        .moveTo(centerX - 100, signatureY)
        .lineTo(centerX + 100, signatureY)
        .strokeColor(textColor)
        .lineWidth(1)
        .stroke();

      // Authority signature
      doc
        .fontSize(14)
        .fillColor(textColor)
        .font("Helvetica-Bold")
        .text("Authorized Signature", centerX, signatureY + 10, {
          align: "center",
          width: 200,
        });

      doc
        .fontSize(12)
        .fillColor(textColor)
        .font("Helvetica")
        .text("Program Director", centerX, signatureY + 30, {
          align: "center",
          width: 200,
        });

      console.log("✅ PDF certificate generated successfully");

      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error("❌ Error generating PDF certificate:", error);
      reject(error);
    }
  });
}

/**
 * Validate certificate data before generation
 * @param data - Certificate data to validate
 * @throws Error if validation fails
 */
export function validateCertificateData(
  data: Partial<CertificateData>
): asserts data is CertificateData {
  if (
    !data.studentName ||
    typeof data.studentName !== "string" ||
    data.studentName.trim().length === 0
  ) {
    throw new Error("Student name is required and must be a non-empty string");
  }

  if (
    !data.college ||
    typeof data.college !== "string" ||
    data.college.trim().length === 0
  ) {
    throw new Error("College name is required and must be a non-empty string");
  }

  if (
    !data.field ||
    typeof data.field !== "string" ||
    data.field.trim().length === 0
  ) {
    throw new Error("Field is required and must be a non-empty string");
  }

  if (
    !data.startDate ||
    !(data.startDate instanceof Date) ||
    isNaN(data.startDate.getTime())
  ) {
    throw new Error("Start date is required and must be a valid Date object");
  }

  if (
    !data.endDate ||
    !(data.endDate instanceof Date) ||
    isNaN(data.endDate.getTime())
  ) {
    throw new Error("End date is required and must be a valid Date object");
  }

  if (data.startDate >= data.endDate) {
    throw new Error("Start date must be before end date");
  }

  console.log("✅ Certificate data validation passed");
}
