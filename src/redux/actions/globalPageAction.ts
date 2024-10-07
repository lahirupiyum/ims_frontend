import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks";
import axios from "axios";

export interface PageResponse {
    data: [],
    totalCount: number
}

export interface PageActionInput {
    url: string;
    page: number;
    pageSize: number;
    request: ActionCreatorWithPayload<void, `${string}/request`>;
    success: ActionCreatorWithPayload<PageResponse, `${string}/success`>;
    reject: ActionCreatorWithPayload<string, `${string}/reject`>;
  }

const globalPageAction = (pageActionInput: PageActionInput) => async(dispatch: ReturnType<typeof useAppDispatch>) => {
    const { url, page, pageSize, request, success, reject } = pageActionInput;
    dispatch(request());
    await axios.get(url, { params: { page, pageSize } })
    .then(res => {
        const pageResponse:PageResponse = res.data;
        dispatch(success(pageResponse));
    })
    .catch(err => {
        dispatch(reject(err.message as string));
    })
}

export default globalPageAction;