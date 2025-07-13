import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { 
  verifyAdminCredentials, 
  generateSessionToken, 
  setAdminSessionCookie 
} from '@/lib/admin-auth'

// Request validation schema
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Admin login attempt')

    // Parse and validate request body
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    console.log(`👤 Login attempt for username: ${validatedData.username}`)

    // Verify admin credentials
    const isValid = verifyAdminCredentials(validatedData.username, validatedData.password)

    if (!isValid) {
      console.log('❌ Invalid admin credentials')
      return NextResponse.json(
        { 
          error: 'Invalid username or password',
          success: false 
        },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()
    console.log('✅ Admin credentials verified, generating session')

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      expiresIn: '24 hours'
    })

    // Set session cookie
    setAdminSessionCookie(response, sessionToken)

    console.log('🎉 Admin login successful')
    return response

  } catch (error) {
    console.error('❌ Error during admin login:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input data',
          details: error.issues.map(issue => issue.message),
          success: false
        },
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred during login',
        success: false
      },
      { status: 500 }
    )
  }
} 