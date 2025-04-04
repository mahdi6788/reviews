import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received review payload:', body); // Log incoming data

    const { productId, rating, comment, user } = body;
    if (!productId || rating < 1 || rating > 5 || !comment) {
      console.log('Validation failed:', { productId, rating, comment });
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { productId, rating, comment, user: user || 'Anonymous' },
    });

    console.log('Review created:', review); // Log created review
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error); // Log any errors
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects
  }
}