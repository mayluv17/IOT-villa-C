import { NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function POST(request: Request) {
  try {
    // Parse the JSON from the request body
    const { moisture, temperature, distance, motion } = await request.json();

    // Create a new sensor reading in the database
    const sensorReading = await prisma.sensorData.create({
      data: {
        moisture,
        temperature,
        distance,
        motion, // new field
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
