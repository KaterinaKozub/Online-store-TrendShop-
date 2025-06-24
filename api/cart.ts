import { createEffect } from "effector"
import toast from "react-hot-toast"
import api from './apiInstance'
import { IAddProductToCartFx, ICartItem, IUpdateCartItemCountFx } from "@/types/cart"
import { handleJWTError } from "@/lib/utils/errors"
import { error } from "console"
import { IDeleteCartItemFx } from "@/types/common"

export const getCartItemsFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/cart/all', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      const newData: ICartItem[] = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'getCartItemsFx' 
      })
      return newData
    }

    if (Array.isArray(data)) return data
    return []
  } catch (error) {
    toast.error((error as Error).message)
    return []
  }
})

export const addProductToCartFx = createEffect(
  async ({jwt, setSpinner, ...dataFields}: IAddProductToCartFx) => {
    try {
      setSpinner(true)
      const { data } = await api.post('/api/cart/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      

      if (data?.error) {
        const newData: { newCartItem: ICartItem } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductToCartFx',
            payload: { ...dataFields, setSpinner }
          }
        )
        return newData
      }

      toast.success('Додати у кошик!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const updateCartItemCountFx = createEffect(
  async ({ jwt, id, setSpinner, count }: IUpdateCartItemCountFx) => {
    setSpinner(true);
    try {
      const { data } = await api.patch(
        `/api/cart/count?id=${id}`,
        { count },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      if (data?.error) {
        const newData = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'updateCartItemCountFx',
          payload: { id, count },
        });
        return newData;
      }

      return data;
    } catch (error) {
      toast.error((error as Error).message);
      return null;
    } finally {
      setSpinner(false);
    }
  }
);

export const deleteCartItemFx = createEffect(
  async({ jwt, id, setSpinner}: IDeleteCartItemFx) => {
    try {
      setSpinner(true)
      const{data} = await api.delete(`/api/cart/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      })

      if (data?.error){
        const newData: {id: string} = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteCartItemFx',
          payload: {id, setSpinner}
        })
        return newData
      }

      toast.success('Видалено з кошика!')
    } catch (error){
      toast.error((error as Error ).message)
    }finally {
      setSpinner(false)
    }
    }
)