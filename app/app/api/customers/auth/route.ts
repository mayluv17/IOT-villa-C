import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  const { pinCode } = await request.json();

  if (!pinCode) {
    return NextResponse.json({ error: 'Access code is required' }, { status: 400 });
  }

  try {
    // Query the database to find the pinCode and check its expiry
    const validAccess = await prisma.access.findFirst({
      where: {
        pinCode: pinCode, // Check for matching pinCode
        expiresAt: {
          gte: new Date(), // Ensure the access code hasn't expired
        },
      },
    });

    if (validAccess) {
      // If pinCode is found and valid, set a cookie with the pinCode
      const expiresInSeconds = Math.floor((new Date(validAccess.expiresAt).getTime() - new Date().getTime()) / 1000);

      // Create a response with the message and user email
      const response = NextResponse.json({
        message: 'Access code is valid',
        email: validAccess.email,
      });

      // Set the cookie with the pinCode and expiration time
      response.cookies.set('session', validAccess.email, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
        maxAge: expiresInSeconds, // Set the cookie expiration time in seconds
        path: '/', // Path for the cookie (valid for the whole site)
      });

      response.cookies.set('access_token', pinCode, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
        secure: true,
        sameSite: 'none',
        maxAge: expiresInSeconds, // Set the cookie expiration time in seconds
        path: '/', // Path for the cookie (valid for the whole site)
      });

      return response; // Return the response with the cookie
    } else {
      // If the pinCode is not valid or expired, return error message
      return NextResponse.json({ error: 'Invalid access code' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error verifying access code:', error);
    return NextResponse.json({ error: 'Failed to verify access code' }, { status: 500 });
  }
}
