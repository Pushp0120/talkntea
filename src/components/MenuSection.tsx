'use client'

import { motion } from 'framer-motion'
import { Coffee, Sandwich, Soup, Star } from 'lucide-react'
import { useState } from 'react'

const menuCategories = [
  { id: 'all', name: 'All Items', icon: Coffee },
  { id: 'tea', name: 'Tea', icon: Coffee },
  { id: 'snacks', name: 'Snacks', icon: Sandwich },
  { id: 'beverages', name: 'Beverages', icon: Soup },
]

const menuItems = [
  {
    id: 1,
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with aromatic herbs',
    price: 30,
    category: 'tea',
    image: '/menu/masala-chai.png',
    featured: true,
  },
  {
    id: 2,
    name: 'Ginger Tea',
    description: 'Fresh ginger infused tea with honey',
    price: 35,
    category: 'tea',
    image: '/menu/ginger-tea.png',
    featured: true,
  },
  {
    id: 3,
    name: 'Green Tea',
    description: 'Premium green tea leaves',
    price: 40,
    category: 'tea',
    image: '/menu/green-tea.png',
    featured: false,
  },
  {
    id: 4,
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes',
    price: 25,
    category: 'snacks',
    image: '/menu/samosa.png',
    featured: true,
  },
  {
    id: 5,
    name: 'Vada Pav',
    description: 'Mumbai style potato vada in pav',
    price: 30,
    category: 'snacks',
    image: '/menu/vada-pav.png',
    featured: true,
  },
  {
    id: 6,
    name: 'Sandwich',
    description: 'Grilled vegetable sandwich with cheese',
    price: 45,
    category: 'snacks',
    image: '/menu/sandwich.png',
    featured: false,
  },
  {
    id: 7,
    name: 'Aloo Tikki Burger',
    description: 'Crispy aloo tikki patty in burger bun',
    price: 50,
    category: 'snacks',
    image: '/menu/aloo-tikki-burger.png',
    featured: true,
  },
  {
    id: 8,
    name: 'Maggi',
    description: 'Spicy vegetable noodles',
    price: 40,
    category: 'snacks',
    image: '/menu/maggi.png',
    featured: true,
  },
  {
    id: 9,
    name: 'Salted Fries',
    description: 'Crispy salted potato fries',
    price: 60,
    category: 'snacks',
    image: '/menu/salted-fries.png',
    featured: false,
  },
  {
    id: 10,
    name: 'Veg Cheese Pizza',
    description: 'Vegetable pizza with cheese',
    price: 95,
    category: 'snacks',
    image: '/menu/veg-cheese-pizza.png',
    featured: true,
  },
  {
    id: 11,
    name: 'Veg Puff',
    description: 'Flaky pastry with vegetable filling',
    price: 25,
    category: 'snacks',
    image: '/menu/veg-puff.png',
    featured: false,
  },
  {
    id: 12,
    name: 'Cold Coffee',
    description: 'Chilled coffee with ice cream',
    price: 70,
    category: 'beverages',
    image: '/menu/cold-coffee.png',
    featured: true,
  },
  {
    id: 13,
    name: 'Milkshake',
    description: 'Thick milkshake in various flavors',
    price: 80,
    category: 'beverages',
    image: '/menu/milkshake.png',
    featured: false,
  },
]

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent font-serif" style={{ backgroundImage: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}>
            Our Menu
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Discover our carefully crafted selection of premium teas and delicious snacks
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {menuCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={activeCategory === category.id ? { backgroundColor: 'var(--terracotta-red)' } : {}}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            )
          })}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-56 flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--warm-cream)' }}>
                {item.featured && (
                  <div className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 z-10 shadow-lg" style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}>
                    <Star className="h-4 w-4 fill-current" />
                    Popular
                  </div>
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <div className="text-white px-4 py-2 rounded-full font-bold shadow-md" style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}>
                    ₹{item.price}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <Coffee className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No items found matching your search.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}