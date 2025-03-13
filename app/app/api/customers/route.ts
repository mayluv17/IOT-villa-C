import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; 
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Function to generate a random 6-character PIN
const generatePinCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export async function POST(request: Request) {
  const { email, expiresAt } = await request.json();
  const pinCode = generatePinCode();

  try {
    // Save the PIN code to the database
    const newCustomer = await prisma.access.create({
      data: {
        email,
        pinCode,
        expiresAt: new Date(expiresAt),
      },
    });

    // Send email using Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace later with your verified domain email
      to: email,
      subject: 'Your PIN Code for Access',
      html: `<p>Your PIN code is: <strong>${pinCode}</strong></p>`,
    });

    return NextResponse.json({
      message: 'PIN generated and email sent successfully',
      pinCode: newCustomer.pinCode,
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to add customer or send email' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const customers = await prisma.access.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
