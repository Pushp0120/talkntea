import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./prisma/dev.db",
    },
  },
})

async function main() {
  // Menu Items
  const menuItems = [
    {
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea with aromatic herbs',
      price: 30,
      category: 'tea',
      featured: true,
    },
    {
      name: 'Ginger Tea',
      description: 'Fresh ginger infused tea with honey',
      price: 35,
      category: 'tea',
      featured: true,
    },
    {
      name: 'Green Tea',
      description: 'Premium green tea leaves',
      price: 40,
      category: 'tea',
      featured: false,
    },
    {
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes',
      price: 25,
      category: 'snacks',
      featured: true,
    },
    {
      name: 'Vada Pav',
      description: 'Mumbai style potato vada in pav',
      price: 30,
      category: 'snacks',
      featured: true,
    },
    {
      name: 'Sandwich',
      description: 'Grilled vegetable sandwich with cheese',
      price: 45,
      category: 'snacks',
      featured: false,
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate sponge cake',
      price: 80,
      category: 'desserts',
      featured: true,
    },
    {
      name: 'Pastry',
      description: 'Fresh cream pastry',
      price: 60,
      category: 'desserts',
      featured: false,
    },
    {
      name: 'Cold Coffee',
      description: 'Chilled coffee with ice cream',
      price: 70,
      category: 'beverages',
      featured: true,
    },
    {
      name: 'Milkshake',
      description: 'Thick milkshake in various flavors',
      price: 80,
      category: 'beverages',
      featured: false,
    },
  ]

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    })
  }

  // Sample Reviews
  const reviews = [
    {
      name: 'Rahul Sharma',
      rating: 5,
      comment: 'Amazing chai and cozy atmosphere! The masala chai here is the best I have ever had.',
      approved: true,
    },
    {
      name: 'Priya Patel',
      rating: 4,
      comment: 'Great place to hang out with friends. Love their snacks and tea selection.',
      approved: true,
    },
    {
      name: 'Amit Kumar',
      rating: 5,
      comment: 'Perfect spot for evening tea. The staff is very friendly and the service is quick.',
      approved: true,
    },
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    })
  }

  // Gallery Images
  const galleryImages = [
    { url: '/placeholder-cafe1.jpg', caption: 'Cozy cafe ambiance', order: 0 },
    { url: '/placeholder-cafe2.jpg', caption: 'Fresh brewing tea', order: 1 },
    { url: '/placeholder-cafe3.jpg', caption: 'Delicious snacks', order: 2 },
    { url: '/placeholder-cafe4.jpg', caption: 'Happy customers', order: 3 },
    { url: '/placeholder-cafe5.jpg', caption: 'Artistic latte art', order: 4 },
    { url: '/placeholder-cafe6.jpg', caption: 'Evening vibes', order: 5 },
    { url: '/placeholder-cafe7.jpg', caption: 'Special events', order: 6 },
    { url: '/placeholder-cafe8.jpg', caption: 'Team preparing orders', order: 7 },
  ]

  for (const image of galleryImages) {
    await prisma.galleryImage.create({
      data: image,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })