"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { Clock, X } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { Product } from "use-shopping-cart/core"

import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { CartItemsEmpty } from "./cart-items-empty"

export function CartItems() {
  const { cartDetails, setItemQuantity, removeItem } = useShoppingCart()
  const cartItems = Object.entries(cartDetails!).map(([_, product]) => product)
  const { toast } = useToast()

  function removeCartItem(product: Product) {
    console.log("removeCartItem", product)
    removeItem(product.id)
    toast({
      title: "Item removed",
      description: `${product.name} has been removed from your cart.`,
      duration: 5000,
      variant: "destructive",
    })
  }

  if (cartItems.length === 0) return <CartItemsEmpty />

  return (
    <ul
      role="list"
      className="border-gray-200 divide-y divide-gray-200 border-y dark:divide-gray-500 dark:border-gray-500"
    >
      {cartItems.map((product, productIdx) => (
        <li key={product._id} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <Image
              src={urlForImage(product.images[0]).url()}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover object-center w-24 h-24 border-2 border-gray-200 rounded-md dark:border-gray-800 sm:h-48 sm:w-48"
            />
          </div>

          <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-medium"
                    >
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {formatCurrencyString({
                    value: product.price,
                    currency: product.currency,
                  })}
                </p>
                <p className="mt-1 text-sm font-medium">
                  Size: {/* @ts-ignore */}
                  <strong>{getSizeName(product.product_data.size)}</strong>
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity, {product.name}
                </label>
                <Input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={10}
                  value={product.quantity}
                  onChange={(e) =>
                    setItemQuantity(product.id, Number(e.target.value))
                  }
                />
                <div className="absolute top-0 right-0">
                  <Button
                    variant="ghost"
                    type="button"
                    className="inline-flex p-2 -mr-2"
                    onClick={() => removeCartItem(product)}
                  >
                    <span className="sr-only">Remove</span>
                    <X className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="flex mt-4 space-x-2 text-sm">
              <Clock className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Ships in 1 week</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
