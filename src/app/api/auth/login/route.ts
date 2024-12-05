import { env } from '@/config/env';
import { db } from '@/utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { email, password } = body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Usuário não encontrado' },
      { status: 404 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ message: 'Senha inválida' }, { status: 401 });
  }

  if (!env.JWT_SECRET) {
    return NextResponse.json(
      { message: 'JWT_SECRET não está definida nas variáveis de ambiente' },
      { status: 500 }
    );
  }

  const accessToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  const response = NextResponse.json(
    { message: 'Login realizado com sucesso' },
    { status: 200 }
  );

  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneWeek),
    maxAge: oneWeek,
    path: '/',
    sameSite: 'strict',
  });

  return response;
}
