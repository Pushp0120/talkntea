'use client'

import { useState } from 'react'
import { MapPin, Phone, Clock, Save } from 'lucide-react'

export default function LocationManagement() {
  const [location, setLocation] = useState({
    name: 'TALK N TEA BILIMORA',
    address: 'Bilimora, Gujarat, India',
    phone: '+91 86967 43047',
    hours: '8:30 AM - 11:00 PM',
    googleMapsUrl: 'https://maps.app.goo.gl/69vE498QVeXo5q5b6',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving - in production, this would save to database
    setTimeout(() => {
      setIsSaving(false)
      alert('Location settings saved successfully!')
    }, 1000)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: 'var(--chai-brown)' }}>
        Location & Settings
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cafe Name
          </label>
          <input
            type="text"
            value={location.name}
            onChange={(e) => setLocation({ ...location, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={location.address}
              onChange={(e) => setLocation({ ...location, address: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={location.phone}
              onChange={(e) => setLocation({ ...location, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opening Hours
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={location.hours}
              onChange={(e) => setLocation({ ...location, hours: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Maps URL
          </label>
          <input
            type="url"
            value={location.googleMapsUrl}
            onChange={(e) => setLocation({ ...location, googleMapsUrl: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}