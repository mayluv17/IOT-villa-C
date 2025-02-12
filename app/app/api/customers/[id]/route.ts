import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Update customer
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { email, expiresAt } = await request.json();
    const { id } = params;

    try {
        const updatedCustomer = await prisma.access.update({
            where: { id: parseInt(id) },
            data: { email, expiresAt: new Date(expiresAt) }
        });

        return NextResponse.json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
    }
}

// Delete customer
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.access.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ message: "Customer access deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
    }
}
