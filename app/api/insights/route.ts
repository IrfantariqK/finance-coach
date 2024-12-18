import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../lib/session';
import { prisma } from '../../lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch last 30 days of transactions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    const prompt = `Analyze these financial transactions and provide insights about spending patterns, suggestions for savings, and potential areas of concern. Format the response in JSON with the following structure: { "summary": "...", "insights": ["..."], "recommendations": ["..."] }. Transactions: ${JSON.stringify(transactions)}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }
    const insights = JSON.parse(content);
    return NextResponse.json(insights);
  } catch (error) {
    console.error('AI Insights error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 