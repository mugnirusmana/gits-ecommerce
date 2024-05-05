import { configureStore } from "@reduxjs/toolkit"
import BannerSlice from "@/reducer/slices/bannerSlice"
import CategoriesSlice from "@/reducer/slices/categoriesSlice"
import ProductsSlice from "@/reducer/slices/productsSlice"
import ProductDetailSlice from "@/reducer/slices/productDetailSlice"
import ChartSlice from "@/reducer/slices/chartSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      BannerSlice: BannerSlice,
      CategoriesSlice: CategoriesSlice,
      ProductsSlice: ProductsSlice,
      ProductDetailSlice: ProductDetailSlice,
      ChartSlice: ChartSlice
    }
  })
}

export const store = makeStore()

export type RootType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch