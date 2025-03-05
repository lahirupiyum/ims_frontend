import axios from "axios";
import { useAppDispatch } from "../hooks";
import DeleteSliceActionType from "../types/DeleteActionType";
import { addOneNotification } from "../slices/notificationSlice";
import { handleLogoutIfUnauthorized } from "./utils";

const globalDeleteAction =
  <ResponseType>(
    url: string,
    actionTypes: DeleteSliceActionType<ResponseType>,
    pageAction?: (
        page: number,
        pageSize: number
      ) => (dispath: ReturnType<typeof useAppDispatch>) => Promise<void>
  ) =>
  async (dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = actionTypes;
    dispatch(request());

    const token = localStorage.getItem("token");

    await axios.delete(url, {headers: {Authorization: "Bearer " + token}})
    .then(res => {
        const { data: responseData, message } = res.data;
        dispatch(success(responseData));
        if (pageAction) dispatch(pageAction(0, 10));
        dispatch(addOneNotification({type:"success", message}));
    })
    .catch(err => {
        handleLogoutIfUnauthorized(err)
        dispatch(reject(err.message));
        
    })
  };

  export default globalDeleteAction;