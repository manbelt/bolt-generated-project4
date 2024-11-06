"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "./review-card"
import { ReviewForm } from "./review-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Review {
  id: string
  authorName: string
  authorImage?: string
  rating: number
  text: string
  date: string
  helpful: number
  notHelpful: number
  images?: string[]
}

interface ReviewsSectionProps {
  businessId: string
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function ReviewsSection({
  businessId,
  reviews: initialReviews,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent")

  const handleSubmitReview = async (reviewData: {
    rating: number
    text: string
    images: File[]
  }) => {
    // In a real implementation, this would make an API call
    const newReview = {
      id: Math.random().toString(),
      authorName: "You", // In real app, get from user session
      rating: reviewData.rating,
      text: reviewData.text,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
      images: reviewData.images.map(file => URL.createObjectURL(file))
    }

    setReviews(prev => [newReview, ...prev])
    setShowReviewDialog(false)
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return b.helpful - a.helpful
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Reviews</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {totalReviews} reviews • {averageRating.toFixed(1)} average rating
          </p>
        </div>

        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogTrigger asChild>
            <Button>Write a Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your experience to help others make better choices.
              </DialogDescription>
            </DialogHeader>
            <ReviewForm
              businessId={businessId}
              onSubmit={handleSubmitReview}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Sort by:</span>
        <Button
          variant={sortBy === "recent" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("recent")}
        >
          Most Recent
        </Button>
        <Button
          variant={sortBy === "helpful" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy("helpful")}
        >
          Most Helpful
        </Button>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
