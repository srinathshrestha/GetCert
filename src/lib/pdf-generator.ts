import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// Certificate data interface
export interface CertificateData {
  studentName: string;
  collegeName: string;
  email: string;
}

// Function to get current date in DD-MM-YYYY format
function getCurrentDateFormatted(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}

// Function to convert image to base64 for embedding
function getImageAsBase64(imagePath: string): string | null {
  try {
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      const ext = path.extname(imagePath).toLowerCase();
      const mimeType = ext === ".png" ? "image/png" : "image/jpeg";
      return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
    }
  } catch (error) {
    console.warn(`⚠️  Could not load image: ${imagePath}`, error);
  }
  return null;
}

// Function to generate HTML template for the certificate
function generateCertificateHTML(data: CertificateData): string {
  const currentDate = getCurrentDateFormatted();
  const logoPath = path.join(process.cwd(), "assets", "logo.png");
  const signaturePath = path.join(process.cwd(), "assets", "signature.png");

  const logoBase64 = getImageAsBase64(logoPath);
  const signatureBase64 = getImageAsBase64(signaturePath);

  // Extract first name for personalization
  const firstName = data.studentName.split(" ")[0];

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Certificate of Internship Completion</title>
      <style>
        @page {
          size: A4;
          margin: 30px;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.5;
          color: #000;
          background: white;
          font-size: 18px;
        }
        
        .certificate-container {
          width: 100%;
          min-height: 100vh;
          position: relative;
          padding: 30px;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
        }
        
        .logo-section {
          flex: 1;
        }
        
        .logo {
          width: 250px; /* Increased from 200px to make logo bigger */
          height: auto;
        }
        
        .company-logo-fallback {
          font-size: 52px;
          color: #6B46C1;
          font-weight: 300;
          letter-spacing: -1px;
        }
        
        .company-info {
          text-align: right;
          flex: 1;
        }
        
        .company-name {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 4px;
          color: #000;
        }
        
        .company-address {
          font-size: 16px;
          line-height: 1.3;
          color: #000;
        }
        
        .date-info {
          text-align: right;
          font-size: 16px;
          color: #000;
          margin: 10px 0;
        }
        
        .divider {
          width: 100%;
          height: 1px;
          background-color: #6B46C1;
          margin: 25px 0 40px 0;
        }
        
        .main-content {
          margin-bottom: 60px;
        }
        
        .content-paragraph {
          text-align: justify;
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 16px;
          color: #000;
        }
        
        .student-name {
          font-weight: bold;
        }
        
        .college-name {
          font-weight: normal;
        }
        
        .highlight {
          font-weight: bold;
        }
        
        .signature-section {
          margin-top: 80px;
          margin-bottom: 80px;
        }
        
        .signature-image {
          width: 150px; /* Increased from 120px */
          height: auto;
          margin-bottom: -5px; /* Negative margin to bring signature closer to text */
        }
        
        .signature-text {
          font-size: 18px;
          line-height: 1.4;
          color: #000;
        }
        
        .signature-name {
          font-weight: bold;
          margin-bottom: 0px;
        }
        
        .signature-title {
          margin-bottom: 0px;
        }
        
        .signature-org {
          margin-bottom: 0px;
        }
        
        .footer {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
        }
        
        .footer-divider {
          width: 100%;
          height: 1px;
          background-color: #000;
          margin-bottom: 8px;
        }
        
        .footer-details {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
        
        .footer-item {
          flex: 1;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="certificate-container">
        <!-- Header -->
        <div class="header">
          <div class="logo-section">
            ${
              logoBase64
                ? `<img src="${logoBase64}" alt="LinkVerse Logo" class="logo" />`
                : `<div class="company-logo-fallback">LinkVerse</div>`
            }
          </div>
          <div class="company-info">
            <div class="company-name">LinkVerse labs private LTD</div>
            <div class="company-address">
              E-703, Ganesh Glory 11,<br>
              SG Highway,Ahmedabad<br>
              CIN: U62099GJ2025PTC158752
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Date -->
        <div class="date-info">
          Date: ${currentDate}
        </div>
        
      
        
        <!-- Main Content -->
        <div class="main-content">
          <div class="content-paragraph">
            This is to certify that <span class="student-name">${
              data.studentName
            }</span>, a student of <span class="college-name">${
    data.collegeName
  }</span>, has successfully completed their internship in the field of <span class="highlight">Frontend Web Development using AI tools</span> from <span class="highlight">2 July 2025 to 17 July 2025</span> under the guidance of the team at <span class="highlight">LinkVerse Labs</span>.
          </div>
          
          <div class="content-paragraph">
            During the internship, <span class="highlight">${firstName}</span> specialized in building modern and responsive website frontends. They made extensive use of AI-powered development tools to accelerate UI creation, improve code efficiency, and enhance user experience. The projects included full deployment cycles using platforms like Vercel, ensuring smooth CI/CD workflows and real-time previews. <span class="highlight">${firstName}</span> also gained exposure to version control, team collaboration, and modern web technologies.
          </div>
          
          <div class="content-paragraph">
            Throughout the internship, they demonstrated strong problem-solving skills, creativity, and a proactive attitude. They were found to be diligent, hardworking, and inquisitive.
          </div>
        </div>
        
        <!-- Signature -->
        <div class="signature-section">
          ${
            signatureBase64
              ? `<img src="${signatureBase64}" alt="Signature" class="signature-image" />`
              : ""
          }
          <div class="signature-text">
            <div class="signature-name">Harshdeepsinh</div>
            <div class="signature-title">Internship Coordinator</div>
            <div class="signature-org">LinkVerse Labs, Ahmedabad</div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-divider"></div>
          <div class="footer-details">
            <div class="footer-item">www.linkverselabs.com</div>
            <div class="footer-item">info@linkverselabs.com</div>
            <div class="footer-item">+91 8866230705</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Function to generate a professional internship certificate PDF using Puppeteer
export async function generateCertificatePDF(
  data: CertificateData
): Promise<Buffer> {
  let browser;

  try {
    console.log("✅ Certificate data validation passed");
    console.log("🎨 Starting PDF generation with Puppeteer:", data);

    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
      ],
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 1600 });

    // Generate HTML content
    const htmlContent = generateCertificateHTML(data);

    // Set page content
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Generate PDF with optimized settings
    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0.4in",
        right: "0.4in",
        bottom: "0.4in",
        left: "0.4in",
      },
    });

    // Convert Uint8Array to Buffer
    const pdfBuffer = Buffer.from(pdfUint8Array);

    console.log(`✅ PDF generation completed (${pdfBuffer.length} bytes)`);

    return pdfBuffer;
  } catch (error) {
    console.error("❌ Error generating PDF certificate:", error);
    throw error;
  } finally {
    // Always close the browser
    if (browser) {
      await browser.close();
    }
  }
}

// Validation function for certificate data
export function validateCertificateData(data: CertificateData): void {
  if (!data.studentName || !data.studentName.trim()) {
    throw new Error("Student name is required");
  }

  if (!data.collegeName || !data.collegeName.trim()) {
    throw new Error("College name is required");
  }

  if (!data.email || !data.email.trim()) {
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error("Invalid email format");
  }
}
