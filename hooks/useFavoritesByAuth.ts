import { $isAuth } from "@/context/auth"
import { $favorites, $favoritesFromLS, favorites } from "@/context/favorites"
import { useUnit } from "effector-react"

export const  useFavoritesByAuth = () => {
    const favorites = useUnit($favorites)
    const isAuth = useUnit($isAuth)
    const favoritesFromLs = useUnit($favoritesFromLS)
    const currentFavoritesByAuth = isAuth ? favorites : favoritesFromLs

    return currentFavoritesByAuth
}
