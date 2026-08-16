'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Menu, Gallery, MessageSquare, MapPin, LogOut, Settings } from 'lucide-react'
import MenuManagement from '@/components/admin/MenuManagement'
import ReviewManagement from '@/components/admin/ReviewManagement'
import GalleryManagement from '@/components/admin/GalleryManagement'
import LocationManagement from '@/components/admin/LocationManagement'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    menuItems: 0,
    reviews: 0,
    galleryImages: 0,
  })

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth')
    if (auth !== 'true') {
      router.push('/admin')
    } else {
      setIsLoading(false)
      fetchStats()
    }
  }, [router])

  const fetchStats = async () => {
    try {
      const [menuRes, reviewsRes, galleryRes] = await Promise.all([
        fetch('/api/menu'),
        fetch('/api/reviews'),
        fetch('/api/gallery'),
      ])

      if (menuRes.ok && reviewsRes.ok && galleryRes.ok) {
        const [menuData, reviewsData, galleryData] = await Promise.all([
          menuRes.json(),
          reviewsRes.json(),
          galleryRes.json(),
        ])

        setStats({
          menuItems: menuData.length,
          reviews: reviewsData.length,
          galleryImages: galleryData.length,
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUsername')
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Management', icon: Menu },
    { id: 'reviews', label: 'Review Management', icon: MessageSquare },
    { id: 'gallery', label: 'Gallery Management', icon: Gallery },
    { id: 'location', label: 'Location & Settings', icon: MapPin },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-cream)' }}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif" style={{ color: 'var(--chai-brown)' }}>
                Talk N Tea Admin
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {localStorage.getItem('adminUsername')}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                style={activeTab === tab.id ? { background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' } : {}}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: 'var(--chai-brown)' }}>
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--warm-cream)' }}>
                  <h3 className="text-lg font-semibold mb-2">Total Menu Items</h3>
                  <p className="text-3xl font-bold" style={{ color: 'var(--brass-gold)' }}>{stats.menuItems}</p>
                </div>
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--warm-cream)' }}>
                  <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
                  <p className="text-3xl font-bold" style={{ color: 'var(--brass-gold)' }}>{stats.reviews}</p>
                </div>
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--warm-cream)' }}>
                  <h3 className="text-lg font-semibold mb-2">Gallery Images</h3>
                  <p className="text-3xl font-bold" style={{ color: 'var(--brass-gold)' }}>{stats.galleryImages}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu' && <MenuManagement />}

          {activeTab === 'reviews' && <ReviewManagement />}

          {activeTab === 'gallery' && <GalleryManagement />}

          {activeTab === 'location' && <LocationManagement />}
        </div>
      </div>
    </div>
  )
}