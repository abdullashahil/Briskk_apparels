"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "../app/context/CartContext"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category?: string
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, rating }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id,
      name,
      price,
      image
    })
  }

  return (
    <div 
      className="group relative" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/shop/${id}`} className="block">
        <div className="overflow-hidden aspect-[3/4] bg-gray-100 mb-4 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={500}
            height={500}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-105" : "scale-100"}`}
            onLoad={() => setImageLoaded(true)}
            priority
          />

          {/* Mobile Add to Cart Button (always visible) */}
          <button
            onClick={handleAddToCart}
            className="md:hidden absolute bottom-0 left-0 right-0 bg-black/80 text-white py-3 text-sm font-medium transition-colors"
          >
            ADD TO CART
          </button>

          {/* Desktop Add to Cart Button (hover only) */}
          <motion.div
            className="hidden md:block absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <button 
              onClick={handleAddToCart}
              className="w-full text-white py-3 text-sm font-medium hover:bg-black transition-colors cursor-pointer"
            >
              ADD TO CART
            </button>
          </motion.div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-base font-medium line-clamp-2 md:line-clamp-1 pr-2 md:pr-4">{name}</h3>
            <span className="font-semibold">${price.toFixed(2)}</span>
          </div>

          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
            <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard