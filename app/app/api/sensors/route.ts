import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { subDays, startOfDay } from 'date-fns';

export async function POST(request: Request) {
  try {
    const { moisture, temperature, distance, motion1, motion2, motion3, motion4 } = await request.json();

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

    return NextResponse.json({ message: 'Sensor data saved successfully', sensorReading }, { status: 200 });
  } catch (error) {
    console.log('Failed to save sensor data:', error);
    return NextResponse.json({ error: 'Failed to save sensor data' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const now = new Date();
    const sevenDaysAgo = subDays(startOfDay(now), 6);

    // Temperature - 7-day daily average
    const tempData = await prisma.$queryRaw`
      SELECT TO_CHAR("createdAt"::date, 'YYYY-MM-DD') as date,
             ROUND(AVG("temperature")::numeric, 2) as temperature
      FROM "SensorData"
      WHERE "createdAt" >= ${sevenDaysAgo}
      GROUP BY date
      ORDER BY date ASC
    `;

    // Most recent full sensor reading (includes moisture, distance, motion1-4)
    const latestReading = await prisma.sensorData.findFirst({
      orderBy: { createdAt: 'desc' },
      select: {
        moisture: true,
        distance: true,
        motion1: true,
        motion2: true,
        motion3: true,
        motion4: true,
      },
    });

    return NextResponse.json({
      data: {
        temperature: tempData,
        moisture: latestReading?.moisture ?? 0,
        distance: latestReading?.distance ?? 0,
        motion1: latestReading?.motion1 ?? false,
        motion2: latestReading?.motion2 ?? false,
        motion3: latestReading?.motion3 ?? false,
        motion4: latestReading?.motion4 ?? false,
      },
    });
  } catch (error) {
    console.log('Failed to fetch sensor data:', error);
    return NextResponse.json({ error: 'Failed to fetch sensor data' }, { status: 500 });
  }
}
