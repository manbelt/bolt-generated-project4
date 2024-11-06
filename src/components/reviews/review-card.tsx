import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, ThumbsDown, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RatingInput } from "./rating-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ReviewCardProps {
  review: {
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
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful)
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful)
  const [userVote, setUserVote] = useState<'helpful' | 'notHelpful' | null>(null)
  const [showReportDialog, setShowReportDialog] = useState(false)

  const handleVote = (type: 'helpful' | 'notHelpful') => {
    if (userVote === type) {
      // Remove vote
      setUserVote(null)
      if (type === 'helpful') {
        setHelpfulCount(prev => prev - 1)
      } else {
        setNotHelpfulCount(prev => prev - 1)
      }
    } else {
      // Add/change vote
      if (userVote) {
        // Remove previous vote
        if (userVote === 'helpful') {
          setHelpfulCount(prev => prev - 1)
        } else {
          setNotHelpfulCount(prev => prev - 1)
        }
      }
      setUserVote(type)
      if (type === 'helpful') {
        setHelpfulCount(prev => prev + 1)
      } else {
        setNotHelpfulCount(prev => prev + 1)
      }
    }
  }

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={review.authorImage} alt={review.authorName} />
          <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">{review.authorName}</h4>
              <div className="flex items-center space-x-2">
                <RatingInput value={review.rating} onChange={() => {}} readOnly />
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-2 text-gray-600 dark:text-gray-300">{review.text}</p>

          {review.images && review.images.length > 0 && (
            <div className="mt-4 flex space-x-2">
              {review.images.map((image, index) => (
                <div key={index} className="relative h-20 w-20">
                  <Image
                    src={image}
                    alt={`Review image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${
                userVote === 'helpful' ? 'text-green-600' : ''
              }`}
              onClick={() => handleVote('helpful')}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{helpfulCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 ${
                userVote === 'notHelpful' ? 'text-red-600' : ''
              }`}
              onClick={() => handleVote('notHelpful')}
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{notHelpfulCount}</span>
            </Button>

            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Review</DialogTitle>
                  <DialogDescription>
                    Why would you like to report this review?
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  {[
                    'Inappropriate content',
                    'Spam',
                    'Fake review',
                    'Personal information',
                    'Other'
                  ].map((reason) => (
                    <Button
                      key={reason}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        // Handle report submission
                        console.log(`Reported for: ${reason}`)
                        setShowReportDialog(false)
                      }}
                    >
                      {reason}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}
