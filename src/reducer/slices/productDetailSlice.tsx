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
  name: 'productsDetail',
  initialState: initialState,
  reducers: {
    reducerProductDetailDefault: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerProductDetailGet: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    reducerProductDetailSuccess: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.data = payload.payload
    },
    reducerProductDetailFailed: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload.payload
    }
  }
})

export const {
    reducerProductDetailDefault,
    reducerProductDetailGet,
    reducerProductDetailSuccess,
    reducerProductDetailFailed,
} = slice.actions

export const setDefaultProductDetail = () => {
  return async (dispatch: Function) => {
    dispatch(reducerProductDetailDefault());
  };
}

export const getProductDetail = (id: string) => {
  return async (dispatch: Function) => {
    dispatch(reducerProductDetailGet())
    axios.get(`https://dummyjson.com/products/${id}`)
      .then((response: any) => {
        dispatch(reducerProductDetailSuccess(response.data??{}))
      })
      .catch(() => {
        const message: any = 'Failed to get data, try to refresh.'
        dispatch(reducerProductDetailFailed(message))
      })
  }
}

export default slice.reducer