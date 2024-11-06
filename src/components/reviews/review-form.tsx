"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RatingInput } from "./rating-input"
import { ImagePlus, Loader2 } from "lucide-react"

interface ReviewFormProps {
  businessId: string
  onSubmit: (review: {
    rating: number
    text: string
    images: File[]
  }) => Promise<void>
}

export function ReviewForm({ businessId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({ rating, text, images })
      // Reset form
      setRating(0)
      setText("")
      setImages([])
      setPreviewUrls([])
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your Rating</label>
        <RatingInput value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Review</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          className="min-h-[100px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Add Photos</label>
        <div className="flex flex-wrap gap-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => {
                  setImages(prev => prev.filter((_, i) => i !== index))
                  setPreviewUrls(prev => prev.filter((_, i) => i !== index))
                }}
              >
                ×
              </Button>
            </div>
          ))}
          {previewUrls.length < 5 && (
            <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
              <ImagePlus className="h-6 w-6 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
                disabled={previewUrls.length >= 5}
              />
            </label>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          You can upload up to 5 images
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || rating === 0}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  )
}
