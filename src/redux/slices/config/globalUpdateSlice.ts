import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

type UpdateState<T> = {
    loading: boolean;
    data: T | null;
    error: string;
}

const getUpdateSlice = <ResponseType>(name:string) => {
    const initialState: UpdateState<ResponseType> = {
        loading: false,
        data: null,
        error: ""
    }
    
    return createSlice({
        name,
        initialState,
        reducers: {
            request: (state) => {
                state.loading = true;
            },
            success: (state, action: PayloadAction<ResponseType>) => {
                state.loading = false;
                state.data = action.payload as Draft<ResponseType>
            },
            reject: (state, action:PayloadAction<string>) => {
                state.loading = false;
                state.error = action.payload;
            },
            reset: (state) => {
                state.loading = false;
                state.data = null;
                state.error = ""
            }
        }
    })
};

export default getUpdateSlice;