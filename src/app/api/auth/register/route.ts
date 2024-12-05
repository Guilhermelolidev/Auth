import { db } from '@/utils/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const { email, name, company } = body;

  const emailExists = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (emailExists) {
    return NextResponse.json(
      { message: 'Email já está em uso' },
      { status: 409 }
    );
  }

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      company,
    },
  });

  return NextResponse.json(
    { message: 'Usuário criado com sucesso', user },
    { status: 201 }
  );
}
