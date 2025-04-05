"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import StarRating from "./star-rating"

interface Product {
  _id: string
  title: string
  price: number
  images: string[]
  rating: {
    rate: number
    count: number
  }
  category: string // Added category
}

export default function RecommendedProducts() {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch("https://briskk-server.vercel.app/api/products/recommended")
        const data = await response.json()
        setRecommendedProducts(data)
      } catch (error) {
        console.error("Error fetching recommended products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendedProducts()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-[#5c564a] mb-6">You May Also Like</h2>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square mb-3"></div>
              <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recommendedProducts.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <ProductCard
                id={product._id}
                name={product.title}
                price={product.price}
                image={product.images[0]}
                rating={product.rating.rate}
                category={product.category} // Now valid since Product includes category
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category?: string // Made optional if not used in the component
}

function ProductCard({ id, name, price, image, rating }: ProductCardProps) {
  return (
    <Link href={`/shop/${id}`} className="group cursor-pointer">
      <div className="aspect-square bg-gray-50 relative overflow-hidden mb-3">
        <Image
          src={image || "/placeholder.svg?height=300&width=300"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-[#5c564a] group-hover:underline line-clamp-1">{name}</h3>
        <div className="flex items-center">
          <StarRating rating={rating} size="sm" />
          <span className="ml-2 text-xs text-gray-500">({Math.round(rating * 10)})</span>
        </div>
        <div className="text-black font-medium">${price.toFixed(2)}</div>
      </div>
    </Link>
  )
}