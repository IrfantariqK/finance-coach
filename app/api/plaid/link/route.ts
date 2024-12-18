import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../../lib/session';
import { plaidClient } from '../../../lib/plaid';
import { prisma } from '../../../lib/prisma';
import { CountryCode, Products } from 'plaid';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const configs = {
      user: {
        client_user_id: user.id,
      },
      client_name: 'Finance Coach',
      products: ['transactions'] as Products[],
      country_codes: ['US'] as CountryCode[],
      language: 'en',
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    
    return NextResponse.json({
      link_token: createTokenResponse.data.link_token
    });
  } catch (error) {
    console.error('Error creating link token:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { public_token } = await request.json();

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // Store the access token in your database
    await prisma.plaidConnection.create({
      data: {
        userId: user.id,
        accessToken,
        itemId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error exchanging public token:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 