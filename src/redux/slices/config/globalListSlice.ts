import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

type ListState<T> = {
    data: T[];
    loading: boolean;
    error: string;
};

const getListSlice = <ResponseType> (name: string) => {
    const initialState: ListState<ResponseType> = {
        data: [],
        loading: false,
        error: ""
    }

    return createSlice({
        name,
        initialState,
        reducers: {
            request: (state) => {
                state.loading = true;
            },
            success: (state, action: PayloadAction<ResponseType[]>) => {
                const list = action.payload as Draft<ResponseType>[];
                state.data = list;
                state.loading = false;
            },
            reject: (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.loading = false;
            },
            reset: (state) => {
                state.data = [];
                state.error = "",
                state.loading = false;
            }
        }
    })
}

export default getListSlice;