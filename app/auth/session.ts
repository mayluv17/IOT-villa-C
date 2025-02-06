'use server';

import { cache } from 'react';

import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import db from '@/lib/db';
import type { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateSessionToken, getPathname } from './misc';

const SESSION_COOKIE_NAME = 'auth_session';
const config = {
  login: '/login',
  register: '/register',
  home: '/',
};

export async function createSession(
  token: string,
  userId: number
): Promise<CreateSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: CreateSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.session.create({
    data: session,
  });

  return session;
}

export const validateSession = cache(
  async (): Promise<SessionValidationResult> => {
    const sessionToken =
      (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

    if (!sessionToken) {
      return {
        user: null,
        session: null,
      };
    }

    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(sessionToken))
    );

    const result = await db.session.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        user: {
          select: {
            id: true,
            user_id: true,
            username: true,
            avatar: true,
            status: true,
            datetime: true,
          },
        },
      },
    });

    if (result === null) {
      return { session: null, user: null };
    }

    const { user, ...session } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
      await db.session.delete({ where: { id: sessionId } });
      return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
      session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
      await db.session.update({
        where: {
          id: session.id,
        },
        data: {
          expiresAt: session.expiresAt,
        },
      });
    }

    return {
      session,
      user,
    };
  }
);

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.session.delete({ where: { id: sessionId } });
}

export async function sessionRegister(user: User) {
  const sessionToken = generateSessionToken();
  const sessionCookie = await createSession(sessionToken, user.id);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: sessionCookie.expiresAt,
    path: '/',
  });
}

export async function logOut() {
  const { session } = await validateSession();
  const pathName = await getPathname();

  if (!session) {
    return redirect(`/login/?redirectPath=${pathName}`);
  }

  await invalidateSession(session.id);

  (await cookies()).set(SESSION_COOKIE_NAME, '', {});

  return redirect(`/login/?redirectPath=${pathName}`);
}
