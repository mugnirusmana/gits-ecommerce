import { configureStore } from "@reduxjs/toolkit"
import BannerSlice from "./slices/bannerSlice"
import CategoriesSlice from "./slices/categoriesSlice"
import ProductsSlice from "./slices/productsSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      BannerSlice: BannerSlice,
      CategoriesSlice: CategoriesSlice,
      ProductsSlice: ProductsSlice
    }
  })
}

export const store = makeStore()

export type RootType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch