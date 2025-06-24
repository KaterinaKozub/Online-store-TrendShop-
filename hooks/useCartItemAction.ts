import { useState } from "react";
import { usePriceAction } from "./usePriceAction";
import { usePriceAnimation } from "./usePriceAnimation";
import { ICartItem } from "@/types/cart";
import { deleteProductFromLS, isUserAuth } from "@/lib/utils/common";
import { deleteProductFromCart, setCartFromLS, setShouldShowEmpty } from "@/context/cart";

export const useCartItemAction = (cartItem: ICartItem) => {
  const [deleteSpinner, setDeleteSpinner] = useState(false);
  const [count, setCount] = useState(+cartItem.count);

  const cleanPrice = parseFloat((cartItem.price + "").replace(/[^\d.]/g, ""));

  const { price, increasePrice, decreasePrice } = usePriceAction(
    +cartItem.count,
    cleanPrice
  );

  const {
    setFrom,
    setTo,
    value: animatedPrice,
  } = usePriceAnimation(cleanPrice, cleanPrice * +cartItem.count);

  const increasePriceWithAnimation = () => {
    setFrom(price);
    setTo(price + cleanPrice);
    increasePrice();
  };

  const decreasePriceWithAnimation = () => {
    setFrom(price);
    setTo(price - cleanPrice);
    decreasePrice();
  };


  const handleDeleteCartItem = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        cartItem.clientId,
        'cart',
        setCartFromLS,
        'Видалено з корзини!'
      )
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    deleteProductFromCart({
      jwt: auth.accessToken,
      id: cartItem._id,
      setSpinner: setDeleteSpinner,
    })
  }
  return {
    deleteSpinner,
    price,
    count,
    setCount,
    increasePrice,
    decreasePrice,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    setFrom,
    setTo,
    animatedPrice,
    handleDeleteCartItem
  };
};
