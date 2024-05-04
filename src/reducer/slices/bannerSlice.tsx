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
    name: 'banner',
    initialState: initialState,
    reducers: {
        reducerBannerDefault: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        },
        reducerBannerGet: (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        },
        reducerBannerSuccess: (state, payload: any) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.data = payload.payload
        },
        reducerBannerFailed: (state, payload: any) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.errorMessage = payload.payload
        }
    }
})

export const {
    reducerBannerDefault,
    reducerBannerGet,
    reducerBannerSuccess,
    reducerBannerFailed,
} = slice.actions

export const setDefaultBanner = () => {
    return async (dispatch: Function) => {
        dispatch(reducerBannerDefault());
    };
}

export const getBanner = () => {
    return async (dispatch: Function) => {
        dispatch(reducerBannerGet())
        axios.get('https://dummyjson.com/products/1')
            .then((response: any) => {
                dispatch(reducerBannerSuccess(response.data??{}))
            })
            .catch((error: any) => {
                const message: any = 'Failed to get data, try to refresh.'
            dispatch(reducerBannerFailed(message))
            })
    }
}

export default slice.reducer