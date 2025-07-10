import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || ''

if (!BUCKET_NAME) {
  console.warn('Warning: AWS_S3_BUCKET_NAME environment variable is not set')
}

/**
 * Upload a PDF buffer to S3 and return the key
 * @param pdfBuffer - The PDF file buffer
 * @param internEmail - The intern's email for file naming
 * @returns Promise<string> - The S3 object key
 */
export async function uploadPdfToS3(pdfBuffer: Buffer, internEmail: string): Promise<string> {
  try {
    // Generate a unique key for the certificate
    const timestamp = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    const uniqueId = uuidv4().split('-')[0] // First part of UUID for brevity
    const sanitizedEmail = internEmail.replace(/[^a-zA-Z0-9.-]/g, '_') // Sanitize email for filename
    const key = `certificates/${timestamp}/${sanitizedEmail}_${uniqueId}.pdf`

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
      ServerSideEncryption: 'AES256', // Enable server-side encryption
      Metadata: {
        'intern-email': internEmail,
        'upload-date': new Date().toISOString(),
      },
    }

    console.log(`🔄 Uploading certificate to S3: ${key}`)
    
    const result = await s3.upload(uploadParams).promise()
    
    console.log(`✅ Certificate uploaded successfully: ${result.Location}`)
    return key
  } catch (error) {
    console.error('❌ Error uploading PDF to S3:', error)
    throw new Error('Failed to upload certificate to cloud storage')
  }
}

/**
 * Generate a pre-signed URL for downloading a certificate
 * @param key - The S3 object key
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Promise<string> - The pre-signed download URL
 */
export async function generateSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: expiresIn, // URL expires in 1 hour by default
      ResponseContentDisposition: 'attachment', // Force download instead of inline display
    }

    console.log(`🔄 Generating signed URL for: ${key}`)
    
    const signedUrl = await s3.getSignedUrlPromise('getObject', params)
    
    console.log(`✅ Signed URL generated successfully (expires in ${expiresIn}s)`)
    return signedUrl
  } catch (error) {
    console.error('❌ Error generating signed URL:', error)
    throw new Error('Failed to generate download link')
  }
}

/**
 * Check if a certificate exists in S3
 * @param key - The S3 object key
 * @returns Promise<boolean> - Whether the object exists
 */
export async function certificateExists(key: string): Promise<boolean> {
  try {
    await s3.headObject({ Bucket: BUCKET_NAME, Key: key }).promise()
    return true
  } catch (error) {
    if ((error as AWS.AWSError).statusCode === 404) {
      return false
    }
    console.error('❌ Error checking certificate existence:', error)
    throw error
  }
}

/**
 * Delete a certificate from S3
 * @param key - The S3 object key
 * @returns Promise<void>
 */
export async function deleteCertificate(key: string): Promise<void> {
  try {
    console.log(`🔄 Deleting certificate from S3: ${key}`)
    
    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise()
    
    console.log(`✅ Certificate deleted successfully: ${key}`)
  } catch (error) {
    console.error('❌ Error deleting certificate:', error)
    throw new Error('Failed to delete certificate')
  }
}

/**
 * Get S3 configuration status for debugging
 * @returns Object with configuration status
 */
export function getS3ConfigStatus() {
  return {
    region: process.env.AWS_REGION || 'us-east-1',
    bucketName: BUCKET_NAME,
    hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
    isConfigured: !!(BUCKET_NAME && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY),
  }
} 