import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RatingInput } from "@/components/reviews/rating-input"

export function RecentReviews() {
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      avatar: "/avatars/john.jpg",
      rating: 5,
      content: "Great service and amazing food!",
      date: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "/avatars/jane.jpg",
      rating: 4,
      content: "Very nice atmosphere, but slightly slow service.",
      date: "1 day ago",
    },
    // Add more reviews
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src={review.avatar} />
                <AvatarFallback>{review.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.author}</h4>
                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <RatingInput value={review.rating} onChange={() => {}} readOnly />
                <p className="text-sm mt-1">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
