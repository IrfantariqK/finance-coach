import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../lib/session';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const transactionSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['income', 'expense']),
  date: z.string().transform((str) => new Date(str)),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await request.json();
    const body = transactionSchema.parse(json);

    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        ...body,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 422 });
    }
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 10;
    const offset = Number(searchParams.get('offset')) || 0;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      skip: offset,
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
} 