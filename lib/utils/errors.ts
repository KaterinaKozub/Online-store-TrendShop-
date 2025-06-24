
import { addProductToCartFx, deleteCartItemFx, getCartItemsFx } from "@/api/cart"
import { JWTError } from "@/constants/jwt"
import { refreshTokenFx } from "@/context/auth"
import { addProductsFromLSToCartFx } from "@/context/cart"
import { addProductsFromLSToComparisonFx, addProductToComparisonFx, deleteComparisonItemFx, getComparisonItemsFx } from "@/context/comparison"
import { addProductsFromLSToFavoritesFx, addProductToFavoriteFx, getFavoriteItemsFx } from "@/context/favorites"
import { loginCheckFx } from "@/context/user"
import { IAddProductsFromLSToCartFx, IAddProductToCartFx, IDeleteCartItemsFx } from "@/types/cart"
import { IAddProductsFromLSToComparisonFx, IAddProductToComparisonFx, IDeleteComparisonItemsFx } from "@/types/comparison"
import { IAddProductsFromLSToFavoriteFx } from "@/types/favorites"
import toast from "react-hot-toast"

// Обробка помилок JWT
export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  // Якщо токен JWT прострочений
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    // Перевірка на наявність refresh токену
    if (!auth || !auth.refreshToken) {
      toast.error('Невірний refresh токен або він відсутній.')
      return null
    }

    try {
      // Оновлення токенів
      const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

      // Повторне виконання запиту після оновлення токену
      if (repeatRequestAfterRefreshData) {
        const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

        switch (repeatRequestMethodName) {
          case 'getCartItemsFx':
            return getCartItemsFx({ jwt: newTokens.accessToken })
            case 'addProductToComparisonFx':
          return addProductToComparisonFx({
            ...(payload as IAddProductToComparisonFx),
            jwt: newTokens.accessToken,
          })

          case 'addProductToCartFx':
            return addProductToCartFx({
              ...(payload as IAddProductToCartFx),
              jwt: newTokens.accessToken,
            })

            case 'getComparisonItemsFx':
          return getComparisonItemsFx({
            jwt: newTokens.accessToken,
          })

           case 'addProductsFromLSToComparisonFx':
          return addProductsFromLSToComparisonFx({
            ...(payload as IAddProductsFromLSToComparisonFx),
            jwt: newTokens.accessToken,
          })
          case 'deleteComparisonItemFx':
          return deleteComparisonItemFx({
            ...(payload as IDeleteComparisonItemsFx),
            jwt: newTokens.accessToken,
          })
            case 'addProductsFromLSToCartFx':
              return addProductsFromLSToCartFx({
                ...(payload as IAddProductsFromLSToCartFx),
                jwt: newTokens.accessToken,
              })

              case 'deleteCartItemFx':
          return deleteCartItemFx({
            ...(payload as IDeleteCartItemsFx),
            jwt: newTokens.accessToken,
          })

          case 'getFavoriteItemsFx':
          return getFavoriteItemsFx({
            jwt: newTokens.accessToken,
          })
          case 'addProductToFavoriteFx':
          return addProductToFavoriteFx({
            ...(payload as Omit<IAddProductToCartFx, 'count'>),
            jwt: newTokens.accessToken,
          })
           case 'addProductsFromLSToFavoritesFx':
          return addProductsFromLSToFavoritesFx({
            ...(payload as IAddProductsFromLSToFavoriteFx),
            jwt: newTokens.accessToken,
          })
          case 'loginCheckFx':
            return loginCheckFx({ jwt: newTokens.accessToken })

          default:
            return null
        }
      }
    } catch (error) {
      toast.error('Не вдалося оновити токен. Спробуйте ще раз.')
      return null
    }
  }

  // Якщо помилка не стосується простроченого токену
  return null
}
