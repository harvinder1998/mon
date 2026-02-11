import { NextRequest, NextResponse } from 'next/server';
import { addLeadToEmailPlatform } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, phone, consent } = body;

    // Validate required fields
    if (!email || !name || !consent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Add lead to email marketing platform
    const result = await addLeadToEmailPlatform({ email, name, phone });

    if (!result.success) {
      console.error('Failed to add lead to email platform:', result.error);
      // Continue anyway - we don't want to block the user
    }

    // Create response with success
    const response = NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      platform: result.platform,
    });

    // Set HTTP-only cookie to track lead submission (1 year expiration)
    response.cookies.set('leadSubmitted', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your request',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check if user has submitted lead
export async function GET(request: NextRequest) {
  const hasSubmitted = request.cookies.get('leadSubmitted');

  return NextResponse.json({
    submitted: hasSubmitted?.value === 'true',
  });
}
