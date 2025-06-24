import { useUnit } from "effector-react";
import { $cart, $cartFromLs, $totalPrice, setTotalPrice } from "@/context/cart";
import { usePriceAnimation } from "./usePriceAnimation";
import { useEffect } from "react";
import { useGoodsByAuth } from "./useGoodsByAuth";

export const useTotalPrice = () => {
  const totalPrice = useUnit($totalPrice);
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)

  const getNewTotal = () =>
    currentCartByAuth
      .map((item) => {
        const rawPrice = typeof item.price === "string" ? item.price : String(item.price);
        const rawCount = typeof item.count === "string" ? item.count : String(item.count);
  
        const price = parseFloat(rawPrice.replace(/[^\d.]/g, ""));
        const count = parseInt(rawCount);
  
        if (isNaN(price) || isNaN(count)) {
          console.warn("Некоректні дані для обчислення ціни:", { price: item.price, count: item.count });
          return 0;
        }
  
        return price * count;
      })
      .reduce((acc, item) => acc + item, 0);
  
  

  const {
    value: animatedPrice,
    setFrom,
    setTo,
  } = usePriceAnimation(totalPrice, getNewTotal());

  useEffect(() => {
    const newTotal = getNewTotal();
    console.log("Попередня загальна ціна:", totalPrice);
    console.log("Нова загальна ціна:", newTotal);

    setTotalPrice(newTotal);
    setFrom(totalPrice);
    setTo(newTotal);
  }, [currentCartByAuth]);

  return { animatedPrice };
};
