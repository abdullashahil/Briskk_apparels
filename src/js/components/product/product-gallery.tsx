"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={images[selectedImage] || "/placeholder.svg?height=600&width=600"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-[#5c564a]" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-[#5c564a]" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square overflow-hidden border cursor-pointer ${
              selectedImage === index ? "border-[#5c564a]" : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

