import axios from "axios";
import { useAppDispatch } from "../hooks";
import ListSliceActionType from "../types/ListActionType";
import { addOneNotification } from "../slices/notificationSlice";
import { handleLogoutIfUnauthorized } from "./utils";

const globalListAction = <ResponseType>(url: string, sliceActions: ListSliceActionType<ResponseType>) => async(dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = sliceActions;
    dispatch(request());


    const token = localStorage.getItem("token");

    await axios.get(url, {headers: {Authorization: "Bearer " + token}})
    .then(res => {
        const response: ResponseType[] = res.data.data;
        dispatch(success(response));
    })
    .catch(err => {
        handleLogoutIfUnauthorized(err)
        const errorMessage = err.response.data.message;
        dispatch(reject(errorMessage));
        dispatch(addOneNotification({type: "error", message: errorMessage}))
    })
}

export default globalListAction;