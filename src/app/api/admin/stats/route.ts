import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticatedFromRequest } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { VerifiedEmailList } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    console.log("📊 Admin stats request");

    // Check if admin is authenticated
    if (!isAdminAuthenticatedFromRequest(request)) {
      console.log("❌ Unauthorized admin stats access attempt");
      return NextResponse.json(
        {
          error: "Unauthorized access",
          success: false,
        },
        { status: 401 }
      );
    }

    console.log("✅ Admin authenticated, fetching statistics");

    // Total interns is the length of VerifiedEmailList (all authorized interns)
    const totalInterns = VerifiedEmailList.length;

    // Get number of interns with certificates (from database)
    const internsWithCertificates = await prisma.intern.count({
      where: {
        certificateKey: {
          not: null,
        },
      },
    });

    // Get interns without certificates (total authorized - those with certificates)
    const internsWithoutCertificates = totalInterns - internsWithCertificates;

    // Get recent certificate generations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCertificates = await prisma.intern.count({
      where: {
        certificateKey: {
          not: null,
        },
        endDate: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get breakdown by field/domain
    const fieldBreakdown = await prisma.intern.groupBy({
      by: ["field"],
      _count: {
        field: true,
      },
      where: {
        certificateKey: {
          not: null,
        },
      },
    });

    // Get recent intern records for display
    const recentInterns = await prisma.intern.findMany({
      take: 10,
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        college: true,
        email: true,
        field: true,
        startDate: true,
        endDate: true,
        certificateKey: true,
      },
    });

    // Calculate certificate completion rate
    const completionRate =
      totalInterns > 0
        ? Math.round((internsWithCertificates / totalInterns) * 100)
        : 0;

    const stats = {
      totalInterns,
      internsWithCertificates,
      internsWithoutCertificates,
      recentCertificates,
      completionRate,
      fieldBreakdown: fieldBreakdown.map((item) => ({
        field: item.field,
        count: item._count.field,
      })),
      recentInterns: recentInterns.map((intern) => ({
        ...intern,
        hasCertificate: !!intern.certificateKey,
        startDate: intern.startDate.toISOString(),
        endDate: intern.endDate.toISOString(),
      })),
    };

    console.log(
      `📈 Stats generated: ${internsWithCertificates}/${totalInterns} certificates`
    );

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('❌ Error fetching admin stats:', error)

    // Handle database connection errors
    if (error instanceof Error && error.message.includes('database')) {
      return NextResponse.json(
        { 
          error: 'Database connection failed. Please try again later.',
          success: false
        },
        { status: 503 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while fetching statistics',
        success: false
      },
      { status: 500 }
    )
  }
} 