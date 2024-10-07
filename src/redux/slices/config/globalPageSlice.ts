import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageResponse } from "../../actions/globalPageAction";
export interface PageState {
  data: [];
  totalCount: number;
  loading: boolean;
  error: string;
}

const initialState: PageState = {
  data: [],
  totalCount: 0,
  loading: false,
  error: "",
};

const getPageSlice = (name: string) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      request: (state) => {
        state.loading = true;
      },
      success: (state, action: PayloadAction<PageResponse>) => {
        const { data, totalCount } = action.payload;
        state.loading = false;
        state.data = data;
        state.totalCount = totalCount;
      },
      reject: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      reset: (state) => {
        state = initialState;
      },
    },
  });
};

export default getPageSlice;
