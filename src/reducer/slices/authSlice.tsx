import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setClearCart } from "@/reducer/slices/cartSlice";

interface PayloadType {
  type?: string | null
  data: {}
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    type: '',
    data: {},
} as any

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        reducerAuthDefault: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.type = null
        },
        reducerAuthGet: (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        reducerAuthSuccess: (state, payload: { payload: PayloadType }) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.type = payload.payload.type
            state.data = payload.payload.data
        },
        reducerAuthFailed: (state, payload) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.errorMessage = payload.payload
        }
    }
})

export const {
    reducerAuthDefault,
    reducerAuthGet,
    reducerAuthSuccess,
    reducerAuthFailed,
} = slice.actions

export const setDefaultLogin = () => {
    return async (dispatch: Function) => {
        dispatch(reducerAuthDefault());
    };
}

export const setLogin = (data: any) => {
  return async (dispatch: Function) => {
    dispatch(reducerAuthGet())
    let config = { headers: { "Content-Type": "application/json" } }
    axios.post('https://dummyjson.com/auth/login', data, config)
      .then((response: any) => {
        const payload: PayloadType = {
          type: 'login',
          data: response.data
        }
        dispatch(reducerAuthSuccess(payload))
      })
      .catch((error: any) => {
        const message: any = error?.response?.data?.message??'Someting went wrong'
        dispatch(reducerAuthFailed(message))
      })
    }
}

export const setLogout = () => {
  return async (dispatch: Function) => {
    const payload: PayloadType = {
      type: 'logout',
      data: {}
    }
    dispatch(reducerAuthSuccess(payload))
    dispatch(setClearCart())
  }
}

export default slice.reducer