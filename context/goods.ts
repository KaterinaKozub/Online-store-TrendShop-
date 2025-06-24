'use client'
import { getBestsellerProductsFx, getNewProductsFx } from "@/api/main-page";
import { ILoadProductFx, ILoadProductsByFilterFx, IProducts } from "@/types/goods";
import { createDomain, createEffect, Effect, sample } from "effector";
import { createGate, Gate } from "effector-react";
import api from '../api/apiInstance'
import { handleShowSizeTable } from "@/lib/utils/common";
import toast from "react-hot-toast";
import { IProduct } from "@/types/common";

export const loadOneProductFx = createEffect(
    async({productId, category, setSpinner, withShowingSizeTable}: ILoadProductFx) => {
        try{
            setSpinner &&  setSpinner(true)
            const {data} = await api.post('/api/goods/one', {productId, category})

            if (data?.message === 'Wrong product id') {
                return {productItem: {errorMessage: 'Wrong product id'}}
            }

            if (withShowingSizeTable) {
                handleShowSizeTable(data.productItem)
            }

            return data
        } catch(error){
            toast.error((error as Error).message)
        }finally{
            setSpinner && setSpinner(false)
        }
    }
)

export const loadProductsByFilterFx = createEffect(
  async ({
    limit,
    offset,
    category,
    isCatalog,
    additionalParam,
  }: ILoadProductsByFilterFx) => {
    try {
      const { data } = await api.get(
        `/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${
          isCatalog ? '&catalog=true' : ''
        }`
      )

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadProductFx>()
export const loadProductsByFilter = goods.createEvent<ILoadProductsByFilterFx>()


// Функція для створення магазина та обробки ефектів
const goodsStoreInstance = (effect: Effect<void, [], Error>) => 
    goods 
        .createStore<IProduct[]>([])
        .on(effect.done, (_, { result }) => {
            // Перевірка результату ефекту
            if (!Array.isArray(result)) {
                console.error("Expected array but got:", result);
            } else {
                console.log("Products loaded successfully:", result);
            }
            return result;
        })
        .on(effect.fail, (_, { error }) => {
            console.error("Error loading products:", error);
            return []; // Повертаємо порожній масив при помилці
        })

// Функція для виконання ефектів при відкритті гейту
const goodsSampleInstance = (
    effect: Effect<void, [], Error>,
    gate: Gate<unknown>
) => 
    sample({
        clock: gate.open,
        target: effect,
    }).watch(() => {
        console.log("Gate opened, effect triggered");
    })

// Створення магазинів для нових продуктів та бестселерів
export const $newProducts = goodsStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductsFx)

// Відкриття ефектів при відкритті гейту
goodsSampleInstance(getNewProductsFx, MainPageGate);
goodsSampleInstance(getBestsellerProductsFx, MainPageGate);

export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)
// Завантаження одного продукту за допомогою події
sample({
  clock: loadOneProduct,
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})

sample({
  clock: loadProductsByFilter,
  source: $products,
  fn: (_, data) => data,
  target: loadProductsByFilterFx,
})
