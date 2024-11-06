"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingInputProps {
  value: number
  onChange: (rating: number) => void
  readOnly?: boolean
}

export function RatingInput({ value, onChange, readOnly = false }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          onClick={() => !readOnly && onChange(rating)}
          onMouseEnter={() => !readOnly && setHoverRating(rating)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
        >
          <Star
            className={`h-5 w-5 ${
              rating <= (hoverRating || value)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
