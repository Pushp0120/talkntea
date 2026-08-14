'use client'

import { motion } from 'framer-motion'
import { Camera, Heart } from 'lucide-react'
import { useState } from 'react'

const galleryImages = [
  { id: 1, url: '/placeholder-cafe1.jpg', caption: 'Cozy cafe ambiance' },
  { id: 2, url: '/placeholder-cafe2.jpg', caption: 'Fresh brewing tea' },
  { id: 3, url: '/placeholder-cafe3.jpg', caption: 'Delicious snacks' },
  { id: 4, url: '/placeholder-cafe4.jpg', caption: 'Happy customers' },
  { id: 5, url: '/placeholder-cafe5.jpg', caption: 'Artistic latte art' },
  { id: 6, url: '/placeholder-cafe6.jpg', caption: 'Evening vibes' },
  { id: 7, url: '/placeholder-cafe7.jpg', caption: 'Special events' },
  { id: 8, url: '/placeholder-cafe8.jpg', caption: 'Team preparing orders' },
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Our Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Capturing moments of joy, laughter, and the perfect cup of tea
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                <Camera className="h-12 w-12 text-amber-400" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[90vh]"
            >
              <div className="aspect-video bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl flex items-center justify-center">
                <Camera className="h-24 w-24 text-amber-400" />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white font-medium">{selectedImage.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}