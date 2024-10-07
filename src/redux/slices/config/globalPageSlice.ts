import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { PageReponse } from "../../actions/globalPageAction";

export type PageState<T> = {
  data: T[],
  loading: boolean,
  totalCount: number,
  error: string
}

const getPageSlice = <ResponseType> (name: string) => {

  const initialState: PageState<ResponseType> = {
    data: [],
    loading: false,
    totalCount: 0,
    error: "",
  }

  return createSlice({
    name,
    initialState,
    reducers: {
      request: (state) => {
        state.loading = true;
      },
      success: (state, action: PayloadAction<PageReponse<ResponseType>>) => {
        const { data, totalCount } = action.payload;
        state.loading = false;
        state.data = [...data] as Draft<ResponseType>[];
        state.totalCount = totalCount;
      },
      reject: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      reset: (state) => {
        state.data = [];
        state.error = "",
        state.loading = false;
        state.totalCount = 0;
      },
    },
  });
};

export default getPageSlice;
