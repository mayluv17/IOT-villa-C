// app/api/customers/request/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';  // Ensure correct path to db

export async function POST(request: NextRequest) {
  const { category, message } = await request.json();

  if (!category) {
    return NextResponse.json({ error: 'Please choose a category.' }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ error: 'Please provide a message.' }, { status: 400 });
  }

  try {
    const guestRequest = await prisma.guestRequest.create({
      data: {
        category,
        message,
      },
    });

    return NextResponse.json(guestRequest, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving guest request' }, { status: 500 });
  }
}
