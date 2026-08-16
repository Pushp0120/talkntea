'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react'

interface MenuItem {
  id: number
  name: string
  description: string | null
  price: number
  category: string
  image: string | null
  featured: boolean
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'tea',
    featured: false,
    image: null as File | null,
  })

  const categories = ['tea', 'snacks', 'beverages']

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data)
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
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
    formDataToSend.append('name', formData.name)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('price', formData.price)
    formDataToSend.append('category', formData.category)
    formDataToSend.append('featured', formData.featured.toString())
    if (formData.image) {
      formDataToSend.append('image', formData.image)
    }

    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu'
      const method = editingItem ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (response.ok) {
        await fetchMenuItems()
        setIsModalOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving menu item:', error)
      alert('Failed to save menu item')
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category,
      featured: item.featured,
      image: null,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchMenuItems()
      }
    } catch (error) {
      console.error('Error deleting menu item:', error)
      alert('Failed to delete menu item')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'tea',
      featured: false,
      image: null,
    })
    setEditingItem(null)
  }

  const openModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading menu items...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-serif" style={{ color: 'var(--chai-brown)' }}>
          Menu Management
        </h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
          style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200"
            style={{ backgroundColor: 'var(--warm-cream)' }}
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm" style={{ color: 'var(--brass-gold)' }}>
                    ₹{item.price}
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-xs text-white px-2 py-1 rounded" style={{ backgroundColor: 'var(--terracotta-red)' }}>
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--chai-brown)' }}>
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
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
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Featured Item
                </label>
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
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
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
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}