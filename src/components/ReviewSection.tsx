'use client'

import { motion } from 'framer-motion'
import { Star, MessageCircle, Send } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  createdAt: string
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      const savedReview = await response.json()

      // Refresh reviews from database
      await fetchReviews()
      setNewReview({ name: '', rating: 5, comment: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className="h-5 w-5"
        style={i < rating ? { color: 'var(--brass-gold)', fill: 'currentColor' } : { color: '#d1d5db' }}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <section id="reviews" className="py-20" style={{ backgroundColor: 'var(--warm-cream)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-8 w-8" style={{ color: 'var(--brass-gold)' }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent font-serif" style={{ backgroundImage: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}>
            Customer Reviews
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 shadow-lg"
            style={{ backgroundColor: 'var(--warm-cream)' }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className="h-8 w-8 transition-colors"
                        style={star <= newReview.rating 
                          ? { color: 'var(--brass-gold)', fill: 'currentColor' } 
                          : { color: '#d1d5db' }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                  style={{ '--tw-ring-color': 'var(--brass-gold)' } as React.CSSProperties}
                  placeholder="Share your experience..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(to right, var(--brass-gold), var(--terracotta-red))' }}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Review
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Reviews List */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading reviews...</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-6 shadow-lg"
                  style={{ backgroundColor: 'var(--warm-cream)' }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(5)}
                    </div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--brass-gold)' }}>
                      {reviews.length > 0 
                        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                        : '5.0'}
                    </span>
                    <span className="text-gray-600">out of 5</span>
                  </div>
                  <p className="text-gray-600">Based on {reviews.length} reviews</p>
                </motion.div>

                {reviews.length === 0 ? (
                  <div className="text-center py-8 rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'var(--warm-cream)' }}>
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: 'var(--warm-cream)' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{review.name}</h4>
                          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </motion.div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}