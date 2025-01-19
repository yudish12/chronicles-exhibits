import { eventWebsiteForm } from '@/server/actions/forms';
import { NextResponse } from 'next/server';
export async function POST(request) {
  try {
    // Parse form data from the request
    const formData = await request.json();
    const { name, email, phone, websiteUrl, page_source } = formData;

    // Validate input
    if (!name || !email || !phone || !websiteUrl) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Process form submission using your existing function
    const result = await eventWebsiteForm(name, email, phone, websiteUrl, page_source);

    if (result.error) {
      return NextResponse.json({ success: false, message: result.error }, { status: 400 });
    }

    // Set an HTTP-only cookie to track form submission
    const response = NextResponse.json({ success: true, message: "Form submitted successfully" });

    response.cookies.set({
      name: 'formSubmitted',
      value: 'true',
      httpOnly: true,   // Secure cookie not accessible via JS
      secure: process.env.NODE_ENV === 'production',  // Only for HTTPS in production
      sameSite: 'Strict',  // Prevent CSRF attacks
      maxAge: 60 * 60 * 24, // Cookie valid for 1 day
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
