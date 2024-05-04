import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: [],
} as any

const slice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    reducerCategoriesDefault: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerCategoriesGet: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    reducerCategoriesSuccess: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.data = payload.payload
    },
    reducerCategoriesFailed: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload.payload
    }
  }
})

export const {
    reducerCategoriesDefault,
    reducerCategoriesGet,
    reducerCategoriesSuccess,
    reducerCategoriesFailed,
} = slice.actions

export const setDefaultCategories = () => {
  return async (dispatch: Function) => {
    dispatch(reducerCategoriesDefault());
  };
}

export const getCategories = () => {
  return async (dispatch: Function) => {
    dispatch(reducerCategoriesGet())
    axios.get('https://dummyjson.com/products/categories')
      .then((response: any) => {
        dispatch(reducerCategoriesSuccess(response.data??[]))
      })
      .catch(() => {
        const message: any = 'Failed to get data, try to refresh.'
        dispatch(reducerCategoriesFailed(message))
      })
  }
}

export default slice.reducer