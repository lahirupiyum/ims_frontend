import axios from "axios";
import { useAppDispatch } from "../hooks";
import PageSliceActionType from "../types/PageActionType";
import { addOneNotification } from "../slices/notificationSlice";
import { handleLogoutIfUnauthorized } from "./utils";

export type PageReponse<T> = {
    data: T[],
    totalCount:number;
}

const globalPageAction = <ResponseType>(page:number, pageSize:number, url:string, sliceActions:PageSliceActionType<ResponseType> ) => async(dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = sliceActions;
    dispatch(request({page, pageSize}));


    const token = localStorage.getItem("token")

    await axios.get(url, { params: { page, pageSize }, headers: {"Authorization": "Bearer "+token} })
    .then(res => {
        const pageResponse:PageReponse<ResponseType> = res.data;
        dispatch(success(pageResponse));
    })
    .catch(err => {
        handleLogoutIfUnauthorized(err)
        const errorMessage = err.response.data.message;
        dispatch(reject(errorMessage));
        dispatch(addOneNotification({type: "error", message: errorMessage}))
    })
}

export default globalPageAction;