import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Update customer
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const { email, expiresAt } = await request.json();
    const { id } = await context.params;  // ✅ Fix: Await params properly
    const numericId = parseInt(id, 10);  // Ensure it's a number

    if (isNaN(numericId)) {
        return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
    }

    try {
        const updatedCustomer = await prisma.access.update({
            where: { id: numericId },
            data: { email, expiresAt: new Date(expiresAt) }
        });

        return NextResponse.json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
    }
}

// Delete customer
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // ✅ Fix: Await params properly
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
        return NextResponse.json({ error: "Invalid customer ID" }, { status: 400 });
    }

    try {
        await prisma.access.delete({ where: { id: numericId } });
        return NextResponse.json({ message: "Customer access deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
    }
}
