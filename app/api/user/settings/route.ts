import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../../lib/session';
import { prisma } from '../../../lib/prisma';

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
} 