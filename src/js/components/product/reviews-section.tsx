"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import StarRating from "./star-rating"
import Image from "next/image"

interface Review {
  id: string
  name: string
  date: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  helpfulCount?: number
}

// Rating distribution for visualization
const ratingDistribution = {
  5: 65,
  4: 20,
  3: 10,
  2: 3,
  1: 2,
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    name: "Alex Johnson",
    date: "October 15, 2023",
    rating: 5,
    title: "Exceptional quality and design",
    comment:
      "This product exceeded all my expectations. The attention to detail is remarkable, and the quality is outstanding. It's exactly what I was looking for and fits perfectly.",
    isVerified: true,
    helpfulCount: 12,
  },
  {
    id: "2",
    name: "Emma Wilson",
    date: "September 28, 2023",
    rating: 4,
    title: "Great product with minor drawbacks",
    comment:
      "I'm very satisfied with my purchase. The material is high-quality and the design is elegant. I only took off one star because the sizing runs slightly small.",
    isVerified: true,
    helpfulCount: 8,
  },
  {
    id: "3",
    name: "Michael Brown",
    date: "November 5, 2023",
    rating: 5,
    title: "Worth every penny",
    comment:
      "This is my second purchase, and I'm just as impressed as the first time. The craftsmanship is superb and the product is built to last. Highly recommend!",
    isVerified: false,
    helpfulCount: 5,
  },
]

export default function ReviewsSection() {
  const [sortBy, setSortBy] = useState("recent")

  // Calculate average rating from mock reviews
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-[#5c564a] mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Review Summary */}
        <div className="lg:col-span-1 bg-gray-50 p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-[#5c564a]">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              <StarRating rating={averageRating} size="lg" />
            </div>
            <div className="text-sm text-gray-500">Based on {mockReviews.length} reviews</div>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center">
                <div className="w-10 text-sm text-gray-600">{star}</div>
                <div className="flex-1 mx-3">
                  <Progress value={ratingDistribution[star as keyof typeof ratingDistribution]} className="h-2 rounded-none" />
                </div>
                <div className="w-8 text-sm text-gray-600 text-right">
                  {ratingDistribution[star as keyof typeof ratingDistribution]}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button className="w-full bg-black text-white hover:bg-black/90 py-5 cursor-pointer rounded-none">Write a Review</Button>
          </div>
        </div>

        {/* Review List */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">{mockReviews.length} Reviews</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                className="text-sm border-b border-gray-300 py-1 pr-6 bg-transparent focus:outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>

          <div className="space-y-8">
            {mockReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white px-8 py-5 cursor-pointer rounded-none"
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewItem({ review }: { review: Review }) {
  // Generate a consistent avatar URL based on the reviewer's name
  const avatarUrl = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(review.name)}&backgroundColor=5c564a&textColor=ffffff`

  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-start">
        <div className="mr-4 w-10 h-10 overflow-hidden">
          <Image
            src={avatarUrl || "/no-profile.png"}
            alt={`${review.name}'s avatar`}
            width={40} 
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-medium text-[#5c564a]">{review.name}</div>
              <div className="text-sm text-gray-500 flex items-center flex-wrap">
                <span>{review.date}</span>
                {review.isVerified && (
                  <div className="ml-3 flex items-center text-green-600 text-xs">
                    <Check className="w-3 h-3 mr-1" /> Verified Purchase
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <StarRating rating={review.rating} />
            </div>
          </div>
          <h3 className="font-medium mt-2">{review.title}</h3>
          <p className="mt-1 text-gray-700">{review.comment}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {review.helpfulCount} {review.helpfulCount === 1 ? "person" : "people"} found this helpful
            </div>
            <div className="flex space-x-4">
              <button className="text-sm text-[#5c564a] hover:underline cursor-pointer">Helpful</button>
              <button className="text-sm text-[#5c564a] hover:underline cursor-pointer">Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

