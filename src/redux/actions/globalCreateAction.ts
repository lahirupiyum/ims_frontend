import axios from "axios";
import { useAppDispatch } from "../hooks";
import CreateSliceActionType from "../types/CreateActionType";
import { addOneNotification } from "../slices/notificationSlice";
import { handleLogoutIfUnauthorized } from "./utils";

const globalCreateAction =
  <RequestType, ResponseType>(
    data: RequestType,
    url: string,
    actions: CreateSliceActionType<ResponseType>
  ) =>
  async (dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject, addOnetoList } = actions;
    dispatch(request());

    const token = localStorage.getItem("token");

    await axios
      .post(url, data, {headers: {Authorization: "Bearer " + token}})
      .then((res) => {
        const { data: responseData, message } = res.data;
        dispatch(success(responseData));
        if (addOnetoList) dispatch(addOnetoList(responseData));
        dispatch(addOneNotification({type:"success", message}));
      })
      .catch((err) => {
        handleLogoutIfUnauthorized(err)
        const message = err.response ? err.response.data.message : err.message;
        dispatch(reject(message));
        dispatch(addOneNotification({type:"error", message}));
      });
  };

export default globalCreateAction;
