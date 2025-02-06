'use server';

import { sessionRegister } from '@/auth/session';
import { handleError } from '../utils';
import * as argon2 from 'argon2';
import { formValidation } from '@explita/daily-toolset/validation';
import { loginSchema, registerSchema } from '@/validation/auth.schemas';
import db from '@/lib/db';
import { Argon2id } from 'oslo/password';

export async function userAuth(formData: FormData, redirectPath?: string) {
  const result = await formValidation(loginSchema, formData);

  if (result.status !== 'success') {
    return { error: true, ...result.errorData };
  }

  try {
    const user = await db.user.findFirst({
      where: { username: result.formData.username },
    });

    if (!user?.id) {
      return {
        error: true,
        errors: undefined,
        message: 'Invalid login details',
      };
    }

    if (user.status !== 'ACTIVE') {
      return {
        error: true,
        errors: undefined,
        message:
          'Your account has been suspended, you can contact admin for details.',
      };
    }

    const isPasswordValid = await new Argon2id().verify(
      user.password,
      result.formData.password
    );

    if (!isPasswordValid) {
      return {
        error: true,
        errors: undefined,
        message: 'Invalid login details',
      };
    }

    await sessionRegister(user);

    return { error: false };
  } catch (error: any) {
    handleError(error.message);
    return { error: true, errors: undefined, message: 'Something went wrong' };
  }
}

export async function registerUser(formData: FormData) {
  try {
    const result = await formValidation(registerSchema, formData);

    if (result.status !== 'success') {
      return { error: true, ...result.errorData };
    }

    const hashedPassword = await new Argon2id().hash(result.formData.password);

    const user = await db.user.create({
      data: {
        ...result.formData,
        password: hashedPassword,
      },
    });

    await sessionRegister(user);
    return { error: false };
  } catch (error: any) {
    handleError(error.message);
    return { error: true, errors: undefined, message: 'Something went wrong' };
  }
}
