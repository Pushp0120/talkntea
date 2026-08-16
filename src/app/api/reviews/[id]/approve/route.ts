import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reviewId = parseInt(id)

    const review = await prisma.review.update({
      where: { id: reviewId },
      data: { approved: true },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error approving review:', error)
    return NextResponse.json({ error: 'Failed to approve review' }, { status: 500 })
  }
}