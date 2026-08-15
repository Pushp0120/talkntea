'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState } from 'react'

const galleryImages = [
  { id: 1, url: '/gallery/cafe-ambiance-1.png', caption: 'Cozy cafe ambiance' },
  { id: 2, url: '/gallery/cafe-ambiance-2.png', caption: 'Beautiful cafe interior' },
  { id: 3, url: '/gallery/chai-brewing.png', caption: 'Fresh brewing tea' },
  { id: 4, url: '/gallery/delicious-snacks.png', caption: 'Delicious snacks' },
  { id: 5, url: '/gallery/happy-customers.png', caption: 'Happy customers' },
  { id: 6, url: '/gallery/latte-art.png', caption: 'Artistic latte art' },
  { id: 7, url: '/gallery/evening-vibes.png', caption: 'Evening vibes' },
  { id: 8, url: '/gallery/special-events.png', caption: 'Special events' },
  { id: 9, url: '/gallery/team-preparing.png', caption: 'Team preparing orders' },
  { id: 10, url: '/gallery/cafe-interior.png', caption: 'Cafe interior' },
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
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
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
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
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
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-full object-contain rounded-2xl"
              />
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