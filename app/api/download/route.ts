import { NextRequest, NextResponse } from 'next/server';
import { getSignedDownloadUrl, isR2Configured, getMockDownloadUrl } from '@/lib/r2';

export async function GET(request: NextRequest) {
  try {
    // Get syllabus level from query params
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');

    if (!level) {
      return NextResponse.json(
        { error: 'Syllabus level is required' },
        { status: 400 }
      );
    }

    // Check if user has submitted lead form (cookie check)
    const hasSubmittedCookie = request.cookies.get('leadSubmitted');

    if (!hasSubmittedCookie || hasSubmittedCookie.value !== 'true') {
      return NextResponse.json(
        {
          error: 'Please submit the lead form to access downloads',
          requiresLead: true,
        },
        { status: 403 }
      );
    }

    // Generate file key
    const fileKey = `syllabus/${level}.pdf`;

    // Generate signed URL
    let downloadUrl: string;

    if (isR2Configured()) {
      try {
        downloadUrl = await getSignedDownloadUrl(fileKey, 900); // 15 minutes
      } catch (error) {
        console.error('R2 error:', error);
        return NextResponse.json(
          { error: 'Failed to generate download URL' },
          { status: 500 }
        );
      }
    } else {
      // Development mode: return mock URL
      console.warn('R2 not configured, returning mock URL');
      downloadUrl = getMockDownloadUrl(fileKey);
    }

    // Log download event (optional analytics)
    console.log(`Download requested: ${level} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      url: downloadUrl,
      level,
      expiresIn: 900, // 15 minutes
    });
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
