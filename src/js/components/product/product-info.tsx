"use client"

import { useState } from "react"
import { Heart, ShoppingBag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import StarRating from "./star-rating"
import { useCart } from "../../app/context/CartContext"

interface ProductInfoProps {
    product: {
        _id: string
        title: string
        price: number
        description: string
        category: string
        images: string[]
        rating: {
            rate: number
            count: number
        }
    }
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState("M")
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99))
    const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1))

    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.title,
            price: product.price,
            image: product.images[0] || '/placeholder-product.jpg'
        }, quantity)
    }

    return (
        <div className="space-y-6">
            {/* Product Header */}
            <div className="rounded-none">
                <div className="inline-block bg-[#5c564a]/10 px-3 py-1 text-sm text-[#5c564a] mb-2 rounded-none">
                    New!
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#5c564a]">
                    {product.title}
                </h1>
                <div className="flex items-center mt-2">
                    <StarRating rating={product.rating.rate} />
                    <span className="ml-2 text-sm text-gray-500">
                        ({product.rating.count} reviews)
                    </span>
                </div>
                <div className="mt-4">
                    <span className="text-2xl font-bold text-[#5c564a]">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Product Tabs */}
            <Tabs defaultValue="description" className="w-full rounded-none">
                <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-200 h-auto rounded-none">
                    {[
                        { value: "description", label: "Description" },
                        { value: "details", label: "Details" },
                        { value: "shipping", label: "Shipping" }
                    ].map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="relative data-[state=active]:text-[#5c564a] shadow-[none] drop-shadow-none data-[state=active]:border-b-black py-3 text-gray-600 cursor-pointer transition-colors duration-300 rounded-none"

                        >
                            {tab.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5c564a] transition-all duration-300 data-[state=active]:w-full rounded-none" />
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="description" className="pt-4 rounded-none">
                    <p className="text-gray-700">{product.description}</p>
                </TabsContent>

                <TabsContent value="details" className="pt-4 rounded-none">
                    <ul className="space-y-2 text-gray-700">
                        <li><span className="font-medium">Material:</span> Premium quality fabric</li>
                        <li><span className="font-medium">Style:</span> Contemporary</li>
                        <li><span className="font-medium">Care:</span> Machine washable</li>
                        <li><span className="font-medium">Origin:</span> Imported</li>
                    </ul>
                </TabsContent>

                <TabsContent value="shipping" className="pt-4 rounded-none">
                    <div className="space-y-3 text-gray-700">
                        <p><span className="font-medium">Standard Shipping:</span> 3-5 business days</p>
                        <p><span className="font-medium">Express Shipping:</span> 1-2 business days</p>
                        <p><span className="font-medium">Free shipping:</span> On orders over $50</p>
                        <p><span className="font-medium">Returns:</span> 30-day return policy</p>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Product Options */}
            <div className="space-y-6 pt-2 rounded-none">
                {/* Size Selection */}
                <div className="rounded-none">
                    <h3 className="text-base font-medium mb-3">Size</h3>
                    <RadioGroup
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                        className="flex flex-wrap gap-3 rounded-none"
                        defaultValue="M"
                    >
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                            <div key={size} className="flex items-center rounded-none">
                                <RadioGroupItem 
                                    value={size} 
                                    id={`size-${size}`} 
                                    className="hidden rounded-none" 
                                />
                                <Label
                                    htmlFor={`size-${size}`}
                                    className={`px-4 py-2 border border-black cursor-pointer hover:bg-black hover:text-white transition-colors rounded-none ${
                                        selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                                    }`}
                                >
                                    {size}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <p className="text-sm text-gray-500 mt-2 cursor-pointer hover:underline rounded-none">
                        Size Guide
                    </p>
                </div>

                {/* Quantity Selector */}
                <div className="rounded-none">
                    <h3 className="text-base font-medium mb-3">Quantity</h3>
                    <div className="flex items-center border border-black w-fit rounded-none">
                        <button
                            onClick={decrementQuantity}
                            className="px-4 py-2 text-black hover:bg-gray-100 transition-colors cursor-pointer rounded-none"
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="px-4 py-2 text-center min-w-[60px] border-x border-black rounded-none">
                            {quantity}
                        </span>
                        <button
                            onClick={incrementQuantity}
                            className="px-4 py-2 text-black hover:bg-gray-100 transition-colors cursor-pointer rounded-none"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2 rounded-none">
                    <Button 
                        onClick={handleAddToCart}
                        className="bg-black text-white hover:bg-black/90 py-5 text-base flex items-center justify-center gap-2 flex-1 cursor-pointer rounded-none"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        Add to Cart
                    </Button>
                    <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white py-5 text-base flex-1 cursor-pointer rounded-none"
                    >
                        <Heart className="mr-2 h-5 w-5" />
                        Add to Wishlist
                    </Button>
                </div>

                {/* Product Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 rounded-none">
                    <div className="text-sm text-gray-500">
                        SKU: {product._id.substring(0, 8)}
                    </div>
                    <button 
                        className="flex items-center text-[#5c564a] hover:text-black transition-colors cursor-pointer rounded-none"
                        aria-label="Share product"
                    >
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}