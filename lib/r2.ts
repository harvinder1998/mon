// Cloudflare R2 client for file storage (S3-compatible)

import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'acca-syllabus';

/**
 * Generate a signed URL for downloading a file from R2
 * @param fileKey - The key of the file in R2 (e.g., 'syllabus/f1.pdf')
 * @param expiresIn - URL expiration time in seconds (default: 15 minutes)
 * @returns Signed URL string
 */
export async function getSignedDownloadUrl(
  fileKey: string,
  expiresIn: number = 900 // 15 minutes
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate download URL');
  }
}

/**
 * Upload a file to R2 (for admin use)
 * @param file - File buffer
 * @param key - Destination key in R2
 * @param contentType - MIME type of the file
 */
export async function uploadFile(
  file: Buffer,
  key: string,
  contentType: string = 'application/pdf'
): Promise<void> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await r2Client.send(command);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * List files in R2 bucket with a specific prefix
 * @param prefix - Prefix to filter files (e.g., 'syllabus/')
 */
export async function listFiles(prefix: string = ''): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await r2Client.send(command);
    return response.Contents?.map((item) => item.Key || '') || [];
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}

/**
 * Check if R2 is configured
 */
export function isR2Configured(): boolean {
  return !!(
    process.env.R2_ENDPOINT &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME
  );
}

/**
 * Get mock download URL for development (when R2 not configured)
 */
export function getMockDownloadUrl(fileKey: string): string {
  // In development, return a placeholder URL
  return `https://via.placeholder.com/800x1000.pdf?text=${encodeURIComponent(
    fileKey
  )}`;
}
