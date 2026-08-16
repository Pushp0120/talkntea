import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const menuId = parseInt(id)
    const formData = await request.formData()

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const featured = formData.get('featured') === 'true'
    const imageFile = formData.get('image') as File | null

    let imageUrl = null
    if (imageFile && imageFile.size > 0) {
      // For now, we'll use a placeholder or convert to base64
      // In production, you'd upload to a cloud storage service
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = imageFile.type
      imageUrl = `data:${mimeType};base64,${base64}`
    }

    const menuItem = await prisma.menuItem.update({
      where: { id: menuId },
      data: {
        name,
        description,
        price,
        category,
        featured,
        ...(imageUrl && { image: imageUrl }),
      },
    })

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const menuId = parseInt(id)

    await prisma.menuItem.delete({
      where: { id: menuId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 })
  }
}