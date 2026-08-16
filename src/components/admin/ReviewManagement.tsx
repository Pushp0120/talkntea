'use client'

import { useState, useEffect } from 'react'
import { Check, X, Trash2, Star } from 'lucide-react'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  approved: boolean
  createdAt: string
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/api/reviews/${id}/approve`, {
        method: 'PUT',
      })

      if (response.ok) {
        await fetchReviews()
      }
    } catch (error) {
      console.error('Error approving review:', error)
      alert('Failed to approve review')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchReviews()
      }
    } catch (error) {
      console.error('Error deleting review:', error)
      alert('Failed to delete review')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
        style={i < rating ? { color: 'var(--brass-gold)' } : {}}
      />
    ))
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading reviews...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 font-serif" style={{ color: 'var(--chai-brown)' }}>
        Review Management
      </h2>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No reviews yet
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-xl border border-gray-200"
              style={{ backgroundColor: 'var(--warm-cream)' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    {!review.approved && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}