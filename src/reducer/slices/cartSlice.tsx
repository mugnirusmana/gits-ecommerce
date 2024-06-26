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
  name: 'cart',
  initialState: initialState,
  reducers: {
    reducerCartDefault: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
    },
    reducerClearCart: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ''
      state.data = []
    },
    reducerCartGet: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    reducerCartSuccess: (state) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
    },
    reducerCartFailed: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload.payload
    },
    reducerAddToCart: (state, payload: any) => {
      state.data = state.data.concat(payload.payload)
    },
    reducerRemoveCart: (state, payload: any) => {
      state.data = payload.payload
    }
  }
})

export const {
  reducerCartDefault,
  reducerClearCart,
  reducerCartGet,
  reducerCartSuccess,
  reducerCartFailed,
  reducerAddToCart,
  reducerRemoveCart
} = slice.actions

export const setDefaultCart = () => {
  return async (dispatch: Function) => {
    dispatch(reducerCartDefault());
  };
}

export const setClearCart = () => {
  return async (dispatch: Function) => {
    dispatch(reducerClearCart());
  };
}

export const getCart = () => {
  return async (dispatch: Function) => {
    dispatch(reducerCartGet())
    setTimeout(() => {
      dispatch(reducerCartSuccess())
    }, 500)
  }
}

export const addToCart = (data: any) => {
  return async (dispatch: Function) => {
    dispatch(reducerAddToCart(data))
    setTimeout(() => {
      dispatch(reducerCartSuccess())
    }, 500)
  }
}

export const removeCart = (item: any, data: any) => {
  return async (dispatch: Function) => {
    let newData = data.filter((itemData: any) => item?.id === itemData?.id && item?.color === itemData?.color && item?.size === itemData?.size && item?.specification === itemData?.specification ? false : true)
    dispatch(reducerRemoveCart(newData))
  }
}

export default slice.reducer