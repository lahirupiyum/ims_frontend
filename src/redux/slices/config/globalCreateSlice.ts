import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateState {
  loading: boolean;
  data: any;
  error: string;
}

const initialState: CreateState = {
  loading: false,
  data: null,
  error: "",
};

const getCreateSlice = <T>(name: string) =>
  createSlice({
    name,
    initialState,
    reducers: {
      request: (state) => {
        state.loading = true;
      },
      success: (state, action: PayloadAction<T>) => {
        state.loading = false;
        state.data = action.payload;
      },
      reject: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      },
      reset: (state) => {
        state = initialState;
      },
    },
  });

export default getCreateSlice;
