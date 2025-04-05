"use client"

import React, { useEffect } from "react"
import { X, ShoppingCart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "../app/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice
    } = useCart()

    // Prevent body scrolling when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isCartOpen])

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Overlay with fade animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/50"
                        onClick={toggleCart}
                        role="button"
                        tabIndex={0}
                        aria-label="Close cart"
                    />

                    {/* Drawer with slide animation */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                        className="absolute right-0 top-0 h-full w-full sm:max-w-md lg:max-w-lg bg-white shadow-xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-lg font-medium">My Bag ({totalItems})</h2>
                                <button
                                    onClick={toggleCart}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    aria-label="Close cart"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {cart.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center h-full text-center"
                                    >
                                        <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                                        <p className="text-gray-500 mb-4">Your bag is empty</p>
                                        <Button
                                            onClick={toggleCart}
                                            className="bg-black text-white hover:bg-black/90"
                                        >
                                            Continue Shopping
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <AnimatePresence>
                                        {cart.map(item => (
                                            <motion.div
                                                key={`cart-item-${item.id}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex gap-4 border-b pb-4"
                                            >
                                                <Link 
                                                    href={`/shop/${item.id}`} 
                                                    onClick={toggleCart}
                                                    className="w-24 h-24 bg-gray-100 relative flex-shrink-0 rounded-none overflow-hidden"
                                                >
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 640px) 100vw, 96px"
                                                            priority
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                </Link>
                                                <div className="flex-1">
                                                    <Link 
                                                        href={`/shop/${item.id}`} 
                                                        onClick={toggleCart}
                                                        className="hover:underline"
                                                    >
                                                        <h3 className="font-medium">{item.name}</h3>
                                                    </Link>
                                                    <div className="flex justify-between mt-1">
                                                        <span className="font-semibold">${item.price.toFixed(2)}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <div className="flex items-center border border-gray-200 w-fit">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    updateQuantity(item.id, item.quantity - 1)
                                                                }}
                                                                className="px-2 py-1 text-black hover:bg-gray-100 transition-colors cursor-pointer"
                                                                aria-label={`Decrease quantity of ${item.name}`}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 py-1 text-center min-w-[30px]">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    updateQuantity(item.id, item.quantity + 1)
                                                                }}
                                                                className="px-2 py-1 text-black hover:bg-gray-100 transition-colors cursor-pointer"
                                                                aria-label={`Increase quantity of ${item.name}`}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                removeFromCart(item.id)
                                                            }}
                                                            className="text-sm text-gray-500 hover:text-black transition-colors cursor-pointer"
                                                            aria-label={`Remove ${item.name} from cart`}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>

                            {/* Footer */}
                            {cart.length > 0 && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="border-t p-4"
                                >
                                    <div className="flex justify-between mb-4">
                                        <span className="font-medium">Subtotal</span>
                                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <Button
                                        className="w-full bg-black text-white hover:bg-black/90 mb-2 rounded-none cursor-pointer"
                                    >
                                        Checkout
                                    </Button>
                                    <button
                                        onClick={toggleCart}
                                        className="block w-full text-center text-sm text-gray-500 hover:text-black py-2 transition-colors cursor-pointer"
                                    >
                                        Continue Shopping
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}