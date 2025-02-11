import { validateSession } from '@/auth/session';
import { NextResponse } from 'next/server';

export async function POST() {
  const { user } = await validateSession();

  return NextResponse.json(user);
}
