import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";

export type SearchActionSliceType = {
  searchAction: ((key: string) => (dispatch: ReturnType<typeof useAppDispatch>) => Promise<void>) | null;
  pageAction: ((
      page: number,
      pageSize: number
    ) => (dispath: ReturnType<typeof useAppDispatch>) => Promise<void>) | null;
};

const initialState: SearchActionSliceType = {
  searchAction: null,
  pageAction: null,
};

const searchActionSlice = createSlice({
  name: "searchAction",
  initialState,
  reducers: {
    updateSearchActionParams: (
      state,
      action: PayloadAction<SearchActionSliceType>
    ) => {
      state.pageAction = action.payload.pageAction;
      state.searchAction = action.payload.searchAction;
    },
    resetSearchActionParams: (state) => {
      state.pageAction = null;
      state.searchAction = null;
    },
  },
});

export const { updateSearchActionParams, resetSearchActionParams } =
  searchActionSlice.actions;
export default searchActionSlice.reducer;
