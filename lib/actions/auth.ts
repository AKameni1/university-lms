'use server';

import { signIn } from '@/auth';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, 'email' | 'password'>,
) => {
  const { email, password } = credentials;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        message: 'Error signing in',
      };
    }

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error signing in',
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = params;

  // Check if the user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((result) => result[0]);

  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityCard,
      universityId,
    });

    await signInWithCredentials({ email, password });

    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error creating user',
    };
  }
};
