// app/api/customers/request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Ensure correct path to db

export async function POST(request: Request) {
  try {
    const { email, category, message, villa } = await request.json();

    // Validate required fields
    if (!email || !category || !message || !villa) {
      return NextResponse.json({ error: 'Email, category, message, and villa are required' }, { status: 400 });
    }

    // Create the guest request
    const guestRequest = await prisma.guestRequest.create({
      data: {
        email,
        category,
        message,
        villa,
        status: 'pending',
      },
    });

    return NextResponse.json(guestRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await prisma.guestRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
