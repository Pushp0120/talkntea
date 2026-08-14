'use client'

import { motion } from 'framer-motion'
import { Coffee, Cake, Sandwich, Soup, Star } from 'lucide-react'
import { useState } from 'react'

const menuCategories = [
  { id: 'all', name: 'All Items', icon: Coffee },
  { id: 'tea', name: 'Tea', icon: Coffee },
  { id: 'snacks', name: 'Snacks', icon: Sandwich },
  { id: 'desserts', name: 'Desserts', icon: Cake },
  { id: 'beverages', name: 'Beverages', icon: Soup },
]

const menuItems = [
  {
    id: 1,
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with aromatic herbs',
    price: 30,
    category: 'tea',
    image: '/placeholder-tea.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Ginger Tea',
    description: 'Fresh ginger infused tea with honey',
    price: 35,
    category: 'tea',
    image: '/placeholder-tea.jpg',
    featured: true,
  },
  {
    id: 3,
    name: 'Green Tea',
    description: 'Premium green tea leaves',
    price: 40,
    category: 'tea',
    image: '/placeholder-tea.jpg',
    featured: false,
  },
  {
    id: 4,
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes',
    price: 25,
    category: 'snacks',
    image: '/placeholder-samosa.jpg',
    featured: true,
  },
  {
    id: 5,
    name: 'Vada Pav',
    description: 'Mumbai style potato vada in pav',
    price: 30,
    category: 'snacks',
    image: '/placeholder-vada.jpg',
    featured: true,
  },
  {
    id: 6,
    name: 'Sandwich',
    description: 'Grilled vegetable sandwich with cheese',
    price: 45,
    category: 'snacks',
    image: '/placeholder-sandwich.jpg',
    featured: false,
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    description: 'Rich chocolate sponge cake',
    price: 80,
    category: 'desserts',
    image: '/placeholder-cake.jpg',
    featured: true,
  },
  {
    id: 8,
    name: 'Pastry',
    description: 'Fresh cream pastry',
    price: 60,
    category: 'desserts',
    image: '/placeholder-pastry.jpg',
    featured: false,
  },
  {
    id: 9,
    name: 'Cold Coffee',
    description: 'Chilled coffee with ice cream',
    price: 70,
    category: 'beverages',
    image: '/placeholder-coffee.jpg',
    featured: true,
  },
  {
    id: 10,
    name: 'Milkshake',
    description: 'Thick milkshake in various flavors',
    price: 80,
    category: 'beverages',
    image: '/placeholder-shake.jpg',
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

  const handleWhatsAppOrder = (itemName: string) => {
    const phoneNumber = '917600230188'
    const message = encodeURIComponent(`Hi! I would like to order ${itemName} from your menu.`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Our Menu
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Popular
                  </div>
                )}
                <Coffee className="h-16 w-16 text-amber-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <span className="text-2xl font-bold text-amber-600">₹{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleWhatsAppOrder(item.name)}
                  className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  Order on WhatsApp
                </motion.button>
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