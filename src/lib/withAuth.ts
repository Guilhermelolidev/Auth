import { NextRequest, NextResponse } from 'next/server';
import { hasUser } from './auth';
import { User } from '@prisma/client';

interface NextRequestWithUser extends NextRequest {
  user: User;
}

export default function withAuth(
  handler: (request: NextRequestWithUser) => Promise<unknown>
) {
  return async (request: NextRequest) => {
    const user = await hasUser();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const requestWithUser = request as NextRequestWithUser;
    requestWithUser.user = user;

    return handler(requestWithUser);
  };
}
