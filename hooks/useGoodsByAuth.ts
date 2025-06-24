'use client'
import { $isAuth } from "@/context/auth"
import { UseGoodsByAuth } from "@/types/common"
import { useUnit } from "effector-react"

export const  useGoodsByAuth = <T>(
    storeAsync: UseGoodsByAuth<T>, 
    storeSync: UseGoodsByAuth<T>
) => {
    const goods = useUnit(storeAsync)
    const isAuth = useUnit($isAuth)
    const goodsFromLs = useUnit(storeSync)
    const currentFavoritesByAuth = isAuth ? goods : goodsFromLs

    return currentFavoritesByAuth
}
