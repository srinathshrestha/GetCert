import { NextResponse } from 'next/server'
import { clearAdminSessionCookie } from '@/lib/admin-auth'

export async function POST() {
  try {
    console.log('🚪 Admin logout attempt')

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    })

    // Clear session cookie
    clearAdminSessionCookie(response)

    console.log('✅ Admin logout successful')
    return response

  } catch (error) {
    console.error('❌ Error during admin logout:', error)

    return NextResponse.json(
      { 
        error: 'An unexpected error occurred during logout',
        success: false
      },
      { status: 500 }
    )
  }
} 