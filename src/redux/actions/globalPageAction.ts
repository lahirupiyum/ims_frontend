import axios from "axios";
import { useAppDispatch } from "../hooks";
import PageSliceActionType from "../types/PageActionType";

export type PageReponse<T> = {
    data: T[],
    totalCount:number;
}

const globalPageAction = <ResponseType>(page:number, pageSize:number, url:string, sliceActions:PageSliceActionType<ResponseType> ) => async(dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = sliceActions;
    dispatch(request({page, pageSize}));
    await axios.get(url, { params: { page, pageSize } })
    .then(res => {
        const pageResponse:PageReponse<ResponseType> = res.data;
        dispatch(success(pageResponse));
    })
    .catch(err => {
        dispatch(reject(err.message as string));
    })
}

export default globalPageAction;