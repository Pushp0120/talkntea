import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { name: 'asc' },
      ],
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const featured = formData.get('featured') === 'true'
    const imageFile = formData.get('image') as File | null

    let imageUrl = null
    if (imageFile && imageFile.size > 0) {
      // Generate filename from item name
      const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
      const filename = `${sanitizedName}.png`
      const uploadDir = join(process.cwd(), 'public', 'menu')
      
      // Ensure directory exists
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      // Save file to public/menu directory
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filepath = join(uploadDir, filename)
      await writeFile(filepath, buffer)

      // Create URL path
      imageUrl = `/menu/${filename}`
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        category,
        featured,
        ...(imageUrl && { image: imageUrl }),
      },
    })

    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 })
  }
}