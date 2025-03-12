import { NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function POST(request: Request) {
    try {
      // Attempt to parse JSON
      const { moisture, temperature, distance } = await request.json();
  
      // Create in the DB
      const sensorReading = await prisma.sensorData.create({
        data: {
          moisture,
          temperature,
          distance,
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
    // Fetch all sensor readings from the database
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
