"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown, Filter, X, SlidersHorizontal } from "lucide-react"
import { useMediaQuery } from "../app/hooks/use-media-query"
import ProductCard from "./ProductCard"

interface Product {
  _id: string
  title: string
  price: number
  images: string[]
  rating: {
    rate: number
    count: number
  }
  category: string
}

type SortOption = "default" | "price-low-high" | "price-high-low"

const ProductsGrid = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [sortOption, setSortOption] = useState<SortOption>("default")
  const [isLoading, setIsLoading] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Fetch all products initially
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("https://briskk-server.vercel.app/api/products")
        const data: Product[] = await response.json()
        setAllProducts(data)
        setFilteredProducts(data) // Initialize with all products
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Apply both filtering and sorting whenever filters or sort change
  useEffect(() => {
    let result = [...allProducts]

    // Apply category filter
    if (activeFilter === "men") {
      result = result.filter(product => product.category === "Men")
    } else if (activeFilter === "women") {
      result = result.filter(product => product.category === "Women")
    }
    // "all" case will keep all products

    // Apply sorting
    if (sortOption === "price-low-high") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(result)
  }, [allProducts, activeFilter, sortOption])

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setMobileFiltersOpen(false)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort)
    setMobileFiltersOpen(false)
  }

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Item variants for individual card animations
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

  // Function to get sort text display
  const getSortText = () => {
    switch(sortOption) {
      case "default": return "Sort: Default";
      case "price-low-high": return "Price: Low to High";
      case "price-high-low": return "Price: High to Low";
    }
  }

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 relative pb-24 md:pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 mt-10">
        <h2 className="text-4xl text-[#5c564a] md:text-5xl font-bold tracking-tight mb-6 md:mb-0">BEST SELLERS</h2>

        {/* Desktop filters and sort */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleFilterChange("men")}
            className={`text-sm font-medium transition-colors hover:text-black cursor-pointer ${
              activeFilter === "men" ? "text-black underline underline-offset-8 decoration-2" : "text-gray-500"
            }`}
          >
            FOR HIM
          </button>
          <button
            onClick={() => handleFilterChange("women")}
            className={`text-sm font-medium transition-colors hover:text-black cursor-pointer ${
              activeFilter === "women" ? "text-black underline underline-offset-8 decoration-2" : "text-gray-500"
            }`}
          >
            FOR HER
          </button>
          <button
            className={`text-sm font-medium transition-colors hover:text-black cursor-pointer border-none ${
              activeFilter === "all"
                ? "text-black underline underline-offset-8 decoration-2"
                : "text-gray-500"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            SEE ALL
          </button>

          {/* Fixed width sort dropdown to prevent resizing */}
          <div className="relative w-[200px]">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-sm font-medium w-full justify-between cursor-pointer border border-black rounded-none px-4 py-2"
              onClick={() =>
                setSortOption(
                  sortOption === "default"
                    ? "price-low-high"
                    : sortOption === "price-low-high"
                      ? "price-high-low"
                      : "default",
                )
              }
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{getSortText()}</span>
              </div>
              {sortOption === "price-low-high" ? (
                <ChevronUp className="h-4 w-4 flex-shrink-0" />
              ) : sortOption === "price-high-low" ? (
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              ) : null}
            </Button>
          </div>
        </div>

        {/* Mobile view - only showing product count, removing the top filter button */}
        <div className="flex md:hidden justify-start w-full">
          <div className="text-sm text-gray-500">{filteredProducts.length} products</div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <ProductCard
                id={product._id}
                name={product.title}
                price={product.price}
                image={product.images[0]}
                rating={product.rating.rate}
                category={product.category}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Mobile filter panel - fixed at bottom */}
      {isMobile && (
        <motion.div
          className={`fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 z-50 ${mobileFiltersOpen ? "block" : "hidden"}`}
          initial={{ y: "100%" }}
          animate={{ y: mobileFiltersOpen ? 0 : "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filter & Sort</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Category</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  className={`text-sm ${activeFilter === "all" ? "bg-black text-white" : "border-gray-300"}`}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </Button>
                <Button
                  variant={activeFilter === "men" ? "default" : "outline"}
                  className={`text-sm ${activeFilter === "men" ? "bg-black text-white" : "border-gray-300"}`}
                  onClick={() => handleFilterChange("men")}
                >
                  For Him
                </Button>
                <Button
                  variant={activeFilter === "women" ? "default" : "outline"}
                  className={`text-sm ${activeFilter === "women" ? "bg-black text-white" : "border-gray-300"}`}
                  onClick={() => handleFilterChange("women")}
                >
                  For Her
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Sort By</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={sortOption === "default" ? "default" : "outline"}
                  className={`text-sm justify-start rounded-none ${sortOption === "default" ? "bg-black text-white" : "border-gray-300"}`}
                  onClick={() => handleSortChange("default")}
                >
                  Featured
                </Button>
                <Button
                  variant={sortOption === "price-low-high" ? "default" : "outline"}
                  className={`text-sm justify-start rounded-none ${sortOption === "price-low-high" ? "bg-black text-white" : "border-gray-300"}`}
                  onClick={() => handleSortChange("price-low-high")}
                >
                  Price: Low to High
                </Button>
                <Button
                  variant={sortOption === "price-high-low" ? "default" : "outline"}
                  className={`text-sm justify-start rounded-none ${sortOption === "price-high-low" ? "bg-black text-white" : "border-gray-300"}`}
                  onClick={() => handleSortChange("price-high-low")}
                >
                  Price: High to Low
                </Button>
              </div>
            </div>

            <Button
              className="w-full bg-black text-white hover:bg-black/90 rounded-none"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </motion.div>
      )}

      {/* Mobile filter toggle button - fixed at bottom when not expanded */}
      {isMobile && !mobileFiltersOpen && (
        <div className="fixed bottom-0 inset-x-0 p-4 bg-white border-t border-gray-200 z-50">
          <Button
            className="w-full bg-black text-white hover:bg-black/90 flex items-center justify-center gap-2 rounded-none"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter className="h-4 w-4" />
            Filter & Sort
          </Button>
        </div>
      )}
    </section>
  )
}

export default ProductsGrid
