import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const {
      moisture,
      temperature,
      distance,
      motion1,
      motion2,
      motion3,
      motion4
    } = await request.json();
    
    const sensorReading = await prisma.sensorData.create({
      data: {
        moisture,
        temperature,
        distance,
        motion1,
        motion2,
        motion3,
        motion4,
      },
    });

    return NextResponse.json(
      { message: 'Sensor data saved successfully', sensorReading },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to save sensor data:', error);
    return NextResponse.json(
      { error: 'Failed to save sensor data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const readings = await prisma.sensorData.findMany();
    return NextResponse.json(readings);
  } catch (error) {
    console.error('Failed to fetch sensor data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sensor data' },
      { status: 500 }
    );
  }
}
