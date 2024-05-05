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
  name: 'chart',
  initialState: initialState,
  reducers: {
    reducerChartDefault: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
    },
    reducerClearChart: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ''
      state.data = []
    },
    reducerChartGet: (state) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
    },
    reducerChartSuccess: (state) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
    },
    reducerChartFailed: (state, payload: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload.payload
    },
    reducerAddToChart: (state, payload: any) => {
      state.data = state.data.concat(payload.payload)
    }
  }
})

export const {
  reducerChartDefault,
  reducerChartGet,
  reducerChartSuccess,
  reducerChartFailed,
  reducerAddToChart
} = slice.actions

export const setDefaultChart = () => {
  return async (dispatch: Function) => {
    dispatch(reducerChartDefault());
  };
}

export const getChart = () => {
  return async (dispatch: Function) => {
    dispatch(reducerChartGet())
    setTimeout(() => {
      dispatch(reducerChartSuccess())
    }, 500)
  }
}

export const addToChart = (data: any) => {
  return async (dispatch: Function) => {
    dispatch(reducerAddToChart(data))
    setTimeout(() => {
      dispatch(reducerChartSuccess())
    }, 500)
  }
}

export default slice.reducer