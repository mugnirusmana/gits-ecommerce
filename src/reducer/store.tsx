import AuthSlice from "./slices/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import BannerSlice from "@/reducer/slices/bannerSlice"
import CategoriesSlice from "@/reducer/slices/categoriesSlice"
import ProductsSlice from "@/reducer/slices/productsSlice"
import ProductDetailSlice from "@/reducer/slices/productDetailSlice"
import CartSlice from "@/reducer/slices/cartSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      AuthSlice: AuthSlice,
      BannerSlice: BannerSlice,
      CategoriesSlice: CategoriesSlice,
      ProductsSlice: ProductsSlice,
      ProductDetailSlice: ProductDetailSlice,
      CartSlice: CartSlice
    }
  })
}

export const store = makeStore()

export type RootType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch