'use client'

import { motion } from 'framer-motion'
import { Menu as MenuIcon, X, MapPin, Star, Send, Clock, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
)
import MenuSection from '@/components/MenuSection'
import GallerySection from '@/components/GallerySection'
import ReviewSection from '@/components/ReviewSection'
import LocationSection from '@/components/LocationSection'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
  ]

  const handleWhatsAppClick = () => {
    const phoneNumber = '918696743047'
    const message = encodeURIComponent('Hi! I would like to know more about your cafe and menu.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <img
                src="/logo.jpg"
                alt="Talk N Tea Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                TALK N TEA
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                    activeSection === item.id ? 'text-amber-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                <Send className="h-4 w-4" />
                WhatsApp
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.instagram.com/talknteaofficial/', '_blank')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <InstagramIcon />
                Instagram
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsOpen(false)
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-amber-50 text-gray-700"
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full"
              >
                <Send className="h-4 w-4" />
                WhatsApp
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.instagram.com/talknteaofficial/', '_blank')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full"
              >
                <InstagramIcon />
                Instagram
              </motion.button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-yellow-100/20" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="mb-8 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl opacity-50" />
              <img
                src="/logo.jpg"
                alt="Talk N Tea Cafe"
                className="h-40 w-40 rounded-full object-cover mx-auto shadow-2xl relative border-4 border-white"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <h1 className="text-6xl md:text-8xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                  TALK N TEA
                </span>
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                BILIMORA
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium"
            >
              Where Every Cup Tells a Story
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
              >
                Explore Menu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppClick}
                className="bg-green-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Order Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-gray-700 font-medium"
            >
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Clock className="h-6 w-6 text-amber-600" />
                <span>8:30 AM - 11 PM</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 text-amber-600" />
                <span>Bilimora, Gujarat</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Phone className="h-6 w-6 text-amber-600" />
                <span>+91 86967 43047</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-8 h-12 border-3 border-amber-600 rounded-full flex justify-center shadow-lg">
            <div className="w-2 h-4 bg-amber-600 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Experience Talk N Tea
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Take a virtual tour of our cafe and discover the perfect ambiance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto border-4 border-white"
            style={{ aspectRatio: '9/16' }}
          >
            <video
              autoPlay
              loop
              controls
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/cafe-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <MenuSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Reviews Section */}
      <ReviewSection />

      {/* Location Section */}
      <LocationSection />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-50" />
                  <img
                    src="/logo.jpg"
                    alt="Talk N Tea Logo"
                    className="h-12 w-12 rounded-full object-cover relative border-2 border-white"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">TALK N TEA</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Your favorite neighborhood cafe serving premium tea and delicious snacks in the heart of Bilimora.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6 text-amber-400">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors font-medium">Menu</button></li>
                <li><button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors font-medium">Gallery</button></li>
                <li><button onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors font-medium">Reviews</button></li>
                <li><button onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors font-medium">Location</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6 text-amber-400">Contact Us</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-amber-400" />
                  Bilimora, Gujarat, India
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-400" />
                  +91 86967 43047
                </li>
              </ul>
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors font-semibold shadow-lg"
                >
                  <Send className="h-5 w-5" />
                  WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://www.instagram.com/talknteaofficial/', '_blank')}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors font-semibold shadow-lg"
                >
                  <InstagramIcon />
                  Instagram
                </motion.button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2024 TALK N TEA BILIMORA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}