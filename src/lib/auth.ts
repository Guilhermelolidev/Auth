import { env } from '@/config/env';
import { User } from '@/entities/User';
import { db } from '@/utils/db';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const getAccessToken = async () => {
  const cookie = await cookies();
  return cookie.get('accessToken')?.value;
};

const verifyAccessTokenIsValid = async (): Promise<string | null> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }

  // token invalid
  // token expired
  try {
    const { userId } = verify(accessToken, env.JWT_SECRET) as {
      userId: string;
    };

    if (!userId) {
      return null;
    }

    return userId;
  } catch (error) {
    return null;
  }
};

export const hasUser = async (): Promise<User | null> => {
  const userId = (await verifyAccessTokenIsValid()) as string;

  if (!userId) {
    return null;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch {
    return null;
  }
};
