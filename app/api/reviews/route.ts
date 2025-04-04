import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received review payload:', body);

    const { productId, rating, comment, user } = body;
    if (!productId || rating < 1 || rating > 5 || !comment) {
      console.log('Validation failed:', { productId, rating, comment });
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { productId, rating, comment, user: user || 'Anonymous' },
    });

    console.log('Review created:', review);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}