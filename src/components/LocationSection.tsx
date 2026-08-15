'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Navigation, Send } from 'lucide-react'

export default function LocationSection() {
  const cafeLocation = {
    name: 'TALK N TEA BILIMORA',
    address: 'Bilimora, Gujarat, India',
    coordinates: '20.7665386,72.9817413',
    phone: '+91 86967 43047',
    hours: '8:30 AM - 11:00 PM',
  }

  const handleWhatsAppNavigation = () => {
    const phoneNumber = '918696743047'
    const message = encodeURIComponent('Hi! I am on my way to your cafe. Could you help me with directions?')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const handleGoogleMaps = () => {
    window.open('https://maps.google.com/?q=20.7665386,72.9817413', '_blank')
  }

  const handleCall = () => {
    window.open(`tel:+918696743047`, '_self')
  }

  return (
    <section id="location" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Find Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Visit us for the perfect tea experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-amber-100 to-orange-100">
              <iframe
                src="https://www.google.com/maps?q=20.7665386,72.9817413&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">{cafeLocation.name}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">{cafeLocation.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Opening Hours</h4>
                    <p className="text-gray-600">{cafeLocation.hours}</p>
                    <p className="text-sm text-green-600 mt-1">Open Now</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">{cafeLocation.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoogleMaps}
                className="bg-blue-500 text-white py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Navigation className="h-5 w-5" />
                Get Directions
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCall}
                className="bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppNavigation}
                className="sm:col-span-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                WhatsApp for Directions
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Quick Info</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Free Wi-Fi available
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Air-conditioned seating
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Parking available
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Card payments accepted
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}