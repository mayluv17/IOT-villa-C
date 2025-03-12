import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/db"; 
// GET request - Retrieve lock-box status
export async function GET() {
  try {
    const lockBox = await prisma.lockBox.findFirst();
    return NextResponse.json({ status: lockBox?.status ?? false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch lock-box status" }, { status: 500 });
  }
}

// POST request - Update lock-box status
export async function POST(req: NextRequest) {
  try {
    const { status } = await req.json();
    const updatedLockBox = await prisma.lockBox.upsert({
      where: { id: 1 },
      update: { status },
      create: { status },
    });
    return NextResponse.json({ status: updatedLockBox.status }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lock-box status" }, { status: 500 });
  }
}
