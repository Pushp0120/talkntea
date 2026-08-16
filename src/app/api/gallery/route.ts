import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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

    // Get file extension from uploaded file
    const fileExtension = imageFile.name.split('.').pop() || 'png'
    
    // Generate unique filename with correct extension
    const timestamp = Date.now()
    const filename = `gallery-${timestamp}.${fileExtension}`
    const uploadDir = join(process.cwd(), 'public', 'gallery')
    
    console.log('File details:', { filename, uploadDir })

    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      console.log('Creating directory:', uploadDir)
      await mkdir(uploadDir, { recursive: true })
    }

    // Save file to public/gallery directory
    console.log('Saving file...')
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)
    console.log('File saved successfully:', filepath)

    // Create URL path
    const imageUrl = `/gallery/${filename}`

    // Get the highest order number
    console.log('Getting order number...')
    const lastImage = await prisma.galleryImage.findFirst({
      orderBy: { order: 'desc' },
    })

    const order = lastImage ? lastImage.order + 1 : 0
    console.log('Order number:', order)

    // Create database record
    console.log('Creating database record...')
    const galleryImage = await prisma.galleryImage.create({
      data: {
        url: imageUrl,
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