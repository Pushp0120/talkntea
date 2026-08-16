import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const caption = formData.get('caption') as string
    const imageFile = formData.get('image') as File | null

    console.log('Upload request received:', { caption, fileName: imageFile?.name, fileSize: imageFile?.size })

    if (!imageFile) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    // Convert file to base64 for database storage
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64String = buffer.toString('base64')
    const mimeType = imageFile.type || 'image/jpeg'
    const dataUrl = `data:${mimeType};base64,${base64String}`

    console.log('Image converted to base64, size:', base64String.length)

    // Get the highest order number
    console.log('Getting order number...')
    const lastImage = await prisma.galleryImage.findFirst({
      orderBy: { order: 'desc' },
    })

    const order = lastImage ? lastImage.order + 1 : 0
    console.log('Order number:', order)

    // Create database record with base64 image
    console.log('Creating database record...')
    const galleryImage = await prisma.galleryImage.create({
      data: {
        url: dataUrl,
        caption,
        order,
      },
    })
    console.log('Database record created:', galleryImage)

    return NextResponse.json(galleryImage, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json({ error: 'Failed to create gallery image', details: String(error) }, { status: 500 })
  }
}