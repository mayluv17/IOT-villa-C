import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Ensure you have prisma client setup

// Function to generate a random 6-character PIN
const generatePinCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

export async function POST(request: Request) {
  const { email, expiresAt } = await request.json();
  const pinCode = generatePinCode();

  try {
    const newCustomer = await prisma.access.create({
      data: {
        email,
        pinCode,
        expiresAt: new Date(expiresAt),
      },
    });

    // Send PIN code via email logic goes here later

    return NextResponse.json({  
      message: 'PIN generated and email sent',
      pinCode: newCustomer.pinCode,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add customer' },
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
// New function to verify access code
