"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { SlidersHorizontal, Star, Clock } from "lucide-react"
import categories from "@/data/categories.json"
import neighborhoods from "@/data/neighborhoods.json"

interface CategoryFiltersProps {
  onFilterChange: (filters: any) => void
  onSortChange: (sort: string) => void
}

export function CategoryFilters({ onFilterChange, onSortChange }: CategoryFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("")
  const [selectedRating, setSelectedRating] = useState<string>("")
  const [selectedPrice, setSelectedPrice] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("relevance")

  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      neighborhood: selectedNeighborhood,
      rating: selectedRating,
      price: selectedPrice,
    })
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onSortChange(value)
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">
              <span className="flex items-center">
                Relevance
              </span>
            </SelectItem>
            <SelectItem value="rating">
              <span className="flex items-center">
                <Star className="mr-2 h-4 w-4" />
                Rating
              </span>
            </SelectItem>
            <SelectItem value="reviews">
              <span className="flex items-center">
                Reviews Count
              </span>
            </SelectItem>
            <SelectItem value="newest">
              <span className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Newest First
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isOpen && (
        <Card className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={(value) => {
              setSelectedCategory(value)
              handleFilterChange()
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Area</label>
            <Select value={selectedNeighborhood} onValueChange={(value) => {
              setSelectedNeighborhood(value)
              handleFilterChange()
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Areas</SelectItem>
                {neighborhoods.neighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood.id} value={neighborhood.id}>
                    {neighborhood.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Rating</label>
            <Select value={selectedRating} onValueChange={(value) => {
              setSelectedRating(value)
              handleFilterChange()
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Minimum rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+ ⭐⭐⭐⭐½</SelectItem>
                <SelectItem value="4.0">4.0+ ⭐⭐⭐⭐</SelectItem>
                <SelectItem value="3.5">3.5+ ⭐⭐⭐½</SelectItem>
                <SelectItem value="3.0">3.0+ ⭐⭐⭐</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <Select value={selectedPrice} onValueChange={(value) => {
              setSelectedPrice(value)
              handleFilterChange()
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Price</SelectItem>
                <SelectItem value="1">€ (Budget)</SelectItem>
                <SelectItem value="2">€€ (Moderate)</SelectItem>
                <SelectItem value="3">€€€ (Expensive)</SelectItem>
                <SelectItem value="4">€€€€ (Luxury)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      )}
    </div>
  )
}
