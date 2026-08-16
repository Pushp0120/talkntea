import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Menu Items
  const menuItems = [
    {
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea with aromatic herbs',
      price: 30,
      category: 'tea',
      featured: true,
      image: '/menu/masala-chai.png',
    },
    {
      name: 'Ginger Tea',
      description: 'Fresh ginger infused tea with honey',
      price: 35,
      category: 'tea',
      featured: true,
      image: '/menu/ginger-tea.png',
    },
    {
      name: 'Green Tea',
      description: 'Premium green tea leaves',
      price: 40,
      category: 'tea',
      featured: false,
      image: '/menu/green-tea.png',
    },
    {
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes',
      price: 25,
      category: 'snacks',
      featured: true,
      image: '/menu/samosa.png',
    },
    {
      name: 'Vada Pav',
      description: 'Mumbai style potato vada in pav',
      price: 30,
      category: 'snacks',
      featured: true,
      image: '/menu/vada-pav.png',
    },
    {
      name: 'Sandwich',
      description: 'Grilled vegetable sandwich with cheese',
      price: 45,
      category: 'snacks',
      featured: false,
      image: '/menu/sandwich.png',
    },
    {
      name: 'Aloo Tikki Burger',
      description: 'Crispy aloo tikki patty in burger bun',
      price: 50,
      category: 'snacks',
      featured: true,
      image: '/menu/aloo-tikki-burger.png',
    },
    {
      name: 'Maggi',
      description: 'Spicy vegetable noodles',
      price: 40,
      category: 'snacks',
      featured: true,
      image: '/menu/maggi.png',
    },
    {
      name: 'Salted Fries',
      description: 'Crispy salted potato fries',
      price: 60,
      category: 'snacks',
      featured: false,
      image: '/menu/salted-fries.png',
    },
    {
      name: 'Veg Cheese Pizza',
      description: 'Vegetable pizza with cheese',
      price: 95,
      category: 'snacks',
      featured: true,
      image: '/menu/veg-cheese-pizza.png',
    },
    {
      name: 'Veg Puff',
      description: 'Flaky pastry with vegetable filling',
      price: 25,
      category: 'snacks',
      featured: false,
      image: '/menu/veg-puff.png',
    },
    {
      name: 'Cold Coffee',
      description: 'Chilled coffee with ice cream',
      price: 70,
      category: 'beverages',
      featured: true,
      image: '/menu/cold-coffee.png',
    },
    {
      name: 'Milkshake',
      description: 'Thick milkshake in various flavors',
      price: 80,
      category: 'beverages',
      featured: false,
      image: '/menu/milkshake.png',
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
    { url: '/gallery/gallery-1.png', caption: 'Talk N Tea Cafe', order: 0 },
    { url: '/gallery/gallery-2.png', caption: 'Our Special Menu', order: 1 },
    { url: '/gallery/gallery-3.png', caption: 'Cafe Ambiance', order: 2 },
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