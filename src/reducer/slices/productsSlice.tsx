import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: {},
} as any

const slice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    reducerProductsDefault: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerProductsGet: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    reducerProductsSuccess: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.data = payload.payload
    },
    reducerProductsFailed: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload.payload
    }
  }
})

export const {
    reducerProductsDefault,
    reducerProductsGet,
    reducerProductsSuccess,
    reducerProductsFailed,
} = slice.actions

export const setDefaultProducts = () => {
  return async (dispatch: Function) => {
    dispatch(reducerProductsDefault());
  };
}

export const getProducts = (params: { categories?: string | null, skip: number, limit: number}) => {
  return async (dispatch: Function) => {
    dispatch(reducerProductsGet())
    let url = 'https://dummyjson.com/products'
    if (params?.categories) url = `https://dummyjson.com/products/category/${params?.categories}`
    axios.get(url, {
      params: {
        skip: params.skip,
        limit: params.limit
      }
    })
      .then((response: any) => {
        dispatch(reducerProductsSuccess(response.data??{}))
      })
      .catch(() => {
        const message: any = 'Failed to get data, try to refresh.'
        dispatch(reducerProductsFailed(message))
      })
  }
}

export default slice.reducer