import axios from "axios";
import { useAppDispatch } from "../hooks";
import ListSliceActionType from "../types/ListActionType";
import { addOneNotification } from "../slices/notificationSlice";

const globalListAction = <ResponseType>(url: string, sliceActions: ListSliceActionType<ResponseType>) => async(dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = sliceActions;
    dispatch(request());

    await axios.get(url)
    .then(res => {
        const response: ResponseType[] = res.data;
        dispatch(success(response));
    })
    .catch(err => {
        const errorMessage = err.response.data.message;
        dispatch(reject(errorMessage));
        dispatch(addOneNotification({type: "error", message: errorMessage}))
    })
}

export default globalListAction;