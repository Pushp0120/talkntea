'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Upload, X } from 'lucide-react'

interface GalleryImage {
  id: number
  url: string
  caption: string | null
  order: number
}

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    caption: '',
    image: null as File | null,
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        console.log('Gallery images fetched:', data)
        setImages(data)
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('caption', formData.caption)
    if (formData.image) {
      formDataToSend.append('image', formData.image)
    }

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        await fetchImages()
        setIsModalOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchImages()
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  const resetForm = () => {
    setFormData({
      caption: '',
      image: null,
    })
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading gallery images...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif" style={{ color: 'var(--chai-brown)' }}>
          Gallery Management
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
          style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}
        >
          <Plus className="h-4 w-4" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="rounded-xl overflow-hidden border-2 border-gray-300 bg-white"
          >
            <div className="w-full h-56 bg-white">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.caption || 'Gallery image'}
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                  onLoad={(e) => {
                    console.log('Image loaded successfully:', image.url, 'naturalWidth:', e.currentTarget.naturalWidth, 'naturalHeight:', e.currentTarget.naturalHeight)
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', image.url, 'error:', e)
                  }}
                />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <p>No image URL</p>
                  <p className="text-xs mt-2">ID: {image.id}</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-800">{image.caption || 'Untitled'}</p>
              <p className="text-xs text-gray-500 mt-1">{image.url}</p>
              <button
                onClick={() => handleDelete(image.id)}
                className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--chai-brown)' }}>
                Add Gallery Image
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                  placeholder="Image caption"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="gallery-image-upload"
                  />
                  <label
                    htmlFor="gallery-image-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </label>
                  {formData.image && (
                    <span className="text-sm text-gray-600">{formData.image.name}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 text-white px-4 py-2 rounded-lg"
                  style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}