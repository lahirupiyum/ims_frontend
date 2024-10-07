import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

const getCreateSlice = <T>(name: string, url: string) =>
  createSlice({
    name,
    initialState,
    reducers: {
      create: (state, action: PayloadAction<{ data: T }>) => {
        const createAction = async (data: T) => {
          state.loading = true;
          await axios
            .post(url, data)
            .then((res) => {
              state.loading = false;
              state.data = res.data;
            })
            .catch((err) => {
              state.loading = false;
              state.error = err.message;
            });
        };
        const { data } = action.payload;
        createAction(data);
      },
      reset: (state) => {
        state = initialState;
      },
    },
  });

export default getCreateSlice;
