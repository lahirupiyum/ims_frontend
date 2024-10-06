import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  totalCount: 0,
  loading: false,
  error: null,
};

interface PageFormat {
  page: number;
  pageSize: number;
}

const getPageSlice = (name: string, url: string) =>
  createSlice({
    name,
    initialState,
    reducers: {
      fetchPage: (state, action: PayloadAction<PageFormat>) => {
        const fetchPageAction = async (page: number, pageSize: number) => {
          state.loading = true;
          axios
            .get(url, { params: { page, pageSize } })
            .then((res) => {
              const { data, totalCount } = res.data;
              state.loading = false;
              state.data = data;
              state.totalCount = totalCount;
            })
            .catch((err) => {
                state.loading = false;
                state.error = err.message;
            });
        };
        const { page, pageSize} = action.payload;
        fetchPageAction(page, pageSize);
      },
      reset: (state) => {
        state = initialState;
      }
    },
  });

  export default getPageSlice;
