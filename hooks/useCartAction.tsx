import { $currentProduct } from "@/context/goods"
import { useUnit } from "effector-react"
import { useMemo, useState } from "react"
import { isItemInList, isUserAuth } from "@/lib/utils/common"
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable
} from "@/lib/utils/cart"
import { $cart, $cartFromLs, updateCartItemCount } from "@/context/cart"
import { count } from "console"
import { useGoodsByAuth } from "./useGoodsByAuth"

export const useCartAction = (isSizeTable = false) => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)

  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )

  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )
  const [count, setCount] = useState(+(existingItem?.count as string) || 1)
  const isProductInCart = isItemInList(currentCartByAuth, product._id)

  const handleAddToCart = (countFromCounter?: number) => {
    const count = countFromCounter || 1

    if (!selectedSize) {
      console.warn("Розмір не обрано")
      return
    }

    const userIsAuth = isUserAuth()

    if (existingItem) {
      if (!userIsAuth) {
        addCartItemToLS(product, selectedSize, countFromCounter|| 1)
        return
      }

      
        const auth = JSON.parse(localStorage.getItem('auth') as string)
        const updatedCountWithSize = !!countFromCounter
          ? +existingItem.count !== countFromCounter
            ? countFromCounter
            : +existingItem.count +1
          : +existingItem.count +1

        
          updateCartItemCount({
            jwt: auth.accessToken,
            id: existingItem._id as string,
            setSpinner: setUpdateCountSpinner, 
            count: selectedSize.length
            ? updatedCountWithSize
            : +existingItem.count + 1,
          })

      addCartItemToLS(product, selectedSize, count)
      return
      }
    

    if (!userIsAuth) {
      addCartItemToLS(product, selectedSize, count)
      return
    }

    if (isSizeTable) {
      addItemToCart(product, setAddToCartSpinner, count, selectedSize)
    } else {
      addProductToCartBySizeTable(product, setAddToCartSpinner, count, selectedSize)
    }
  }

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  )
  return {
    product,
    selectedSize,
    setSelectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    handleAddToCart,
    existingItem,
    isProductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
    count,
    setCount,
    allCurrentCartItemCount
  }
}

