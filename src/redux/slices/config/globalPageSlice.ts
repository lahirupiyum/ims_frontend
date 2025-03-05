import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { PageReponse } from "../../actions/globalPageAction";

export type PageState<T> = {
  page: number,
  pageSize: number,
  data: T[],
  loading: boolean,
  totalCount: number,
  error: string
  actionType: "page" | "search"
}

export type UpdateStateType<T> = {
  index: number;
  data: T
}

const getPageSlice = <ResponseType> (name: string) => {

  const initialState: PageState<ResponseType> = {
    page: 0,
    pageSize: 0,
    data: [],
    loading: false,
    totalCount: 0,
    error: "",
    actionType: "page"
  }

  return createSlice({
    name,
    initialState,
    reducers: {
      request: (state, action: PayloadAction<{page: number, pageSize:number}>) => {
        const {page, pageSize } = action.payload;
        state.page = page;
        state.pageSize = pageSize;
        state.loading = true;
        state.actionType = "page"
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
        state.page = 0,
        state.pageSize = 0;
        state.actionType = "page"
      },
      create: (state, action: PayloadAction<ResponseType>) => {
        state.totalCount++
        if(state.pageSize === state.data.length) return;
        state.data.push(action.payload as Draft<ResponseType>);
      },
      update: (state, action: PayloadAction<UpdateStateType<ResponseType>>) => {
        const dummyData = [...state.data] as ResponseType[];
        const { index, data } = action.payload;
        dummyData[index] = data;
        state.data = dummyData as Draft<ResponseType>[]
      },
      searchRequest: (state) => {
        state.page = 0;
        state.pageSize = 0;
        state.loading = true;
        state.actionType = "search"
      },
      searchSuccess: (state, action: PayloadAction<ResponseType[]>) => {
        state.loading = false;
        state.data = action.payload as Draft<ResponseType[]>
      }
    },
  });
};

export default getPageSlice;
