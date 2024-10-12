import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';

type CreateState<ResponseType> = {
  loading: boolean;
  data: ResponseType | null;
  error: string;
}

const getCreateSlice = <ResponseType>(name: string) =>{

  const initialState: CreateState<ResponseType> = {
    loading: false,
    data: null,
    error: "",
  };

  return createSlice({
    name,
    initialState,
    reducers: {
      request: (state) => {
        state.loading = true;
      },
      success: (state, action: PayloadAction<ResponseType>) => {
        state.loading = false;
        console.log(action.payload);
        state.data = action.payload as Draft<ResponseType>;
      },
      reject: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      },
      reset: (state) => {
        state.loading = false;
        state.data = null;
        state.error = ""
      },
    },
  })};

export default getCreateSlice;
