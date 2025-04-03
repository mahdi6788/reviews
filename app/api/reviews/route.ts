// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { productId, rating, comment, user } = await req.json();
    const review = await prisma.review.create({
      data: { productId, rating, comment, user },
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}