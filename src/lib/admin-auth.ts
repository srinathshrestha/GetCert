import { NextRequest, NextResponse } from "next/server";

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Session token for admin authentication
const ADMIN_SESSION_TOKEN = "admin_session_token";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Verify admin credentials
 * @param username - Provided username
 * @param password - Provided password
 * @returns boolean indicating if credentials are valid
 */
export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

/**
 * Generate a simple session token
 * @returns string session token
 */
export function generateSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}_${random}`;
}

/**
 * Set admin session cookie in response
 * @param response - NextResponse object
 * @param token - Session token to set
 */
export function setAdminSessionCookie(response: NextResponse, token: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  response.cookies.set(ADMIN_SESSION_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Clear admin session cookie in response
 * @param response - NextResponse object
 */
export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.delete(ADMIN_SESSION_TOKEN);
}

/**
 * Get admin session from request
 * @param request - NextRequest object
 * @returns string | undefined session token
 */
export function getAdminSessionFromRequest(
  request: NextRequest
): string | undefined {
  return request.cookies.get(ADMIN_SESSION_TOKEN)?.value;
}

/**
 * Check if session token is valid
 * @param token - Session token to check
 * @returns boolean indicating if token is valid
 */
export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  // Extract timestamp from token
  const [timestampStr] = token.split("_");
  const timestamp = parseInt(timestampStr);
  const now = Date.now();

  // Check if session is still valid (within 24 hours)
  return now - timestamp < SESSION_DURATION;
}

/**
 * Check admin authentication from request
 * @param request - Next.js request object
 * @returns boolean indicating if admin is authenticated
 */
export function isAdminAuthenticatedFromRequest(request: NextRequest): boolean {
  const token = getAdminSessionFromRequest(request);
  return isValidSessionToken(token);
}

/**
 * Get admin configuration info (for debugging)
 * @returns object with admin config status
 */
export function getAdminConfig() {
  return {
    hasUsername: !!ADMIN_USERNAME,
    hasPassword: !!ADMIN_PASSWORD,
    sessionDuration: SESSION_DURATION,
    environment: process.env.NODE_ENV,
  };
}
