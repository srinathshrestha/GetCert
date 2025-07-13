import { PrismaClient } from "@prisma/client";

// Global variable to store the Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a singleton Prisma client instance
// This ensures we don't create multiple connections in development
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// In development, store the client on the global object
// to prevent multiple instances due to hot reloading
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Database connection helper functions
export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
    throw error;
  }
}

// Helper function to verify if an intern exists by email
export async function findInternByEmail(email: string) {
  try {
    const intern = await prisma.intern.findUnique({
      where: {
        email: email.toLowerCase().trim(), // Ensure consistent email format
      },
    });
    return intern;
  } catch (error) {
    console.error("Error finding intern by email:", error);
    throw error;
  }
}

// Helper function to update certificate key for an intern
export async function updateInternCertificateKey(
  email: string,
  certificateKey: string
) {
  try {
    const updatedIntern = await prisma.intern.update({
      where: {
        email: email.toLowerCase().trim(),
      },
      data: {
        certificateKey,
      },
    });
    return updatedIntern;
  } catch (error) {
    console.error("Error updating intern certificate key:", error);
    throw error;
  }
}

// Helper function to create a new intern record
export async function createInternRecord(
  name: string,
  college: string, 
  email: string,
  field: string = "Web Development", // Default field
  startDate: Date = new Date("2024-01-01"), // Default start date
  endDate: Date = new Date("2024-12-31") // Default end date
) {
  try {
    const newIntern = await prisma.intern.create({
      data: {
        name: name.trim(),
        college: college.trim(),
        email: email.toLowerCase().trim(),
        field,
        startDate,
        endDate,
      },
    });
    console.log(`✅ Intern record created successfully: ${newIntern.name}`);
    return newIntern;
  } catch (error) {
    console.error("Error creating intern record:", error);
    throw error;
  }
}
