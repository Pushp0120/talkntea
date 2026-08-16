'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

interface GalleryImage {
  id: number
  url: string
  caption: string | null
  order: number
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setGalleryImages(data)
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="gallery" className="py-20" style={{ backgroundColor: 'var(--warm-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent font-serif" style={{ backgroundImage: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}>
            Our Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Capturing moments of joy, laughter, and the perfect cup of tea
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -8 }}
              onClick={() => setSelectedImage(image)}
              className="relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-2xl group border-4 border-white"
            >
              <img
                src={image.url}
                alt={image.caption || 'Gallery image'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-lg font-semibold">{image.caption}</p>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {!isLoading && galleryImages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No gallery images yet.</p>
          </div>
        )}

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
                alt={selectedImage.caption || 'Gallery image'}
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