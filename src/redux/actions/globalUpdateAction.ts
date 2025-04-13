import axios from "axios";
import { useAppDispatch } from "../hooks";
import { addOneNotification } from "../slices/notificationSlice";
import UpdateSliceActionType from "../types/UpdateActionType";
import { handleLogoutIfUnauthorized } from "./utils";

const globalUpdateAction =
  <RequestType, ResponseType>(
    index: number,
    data: RequestType,
    url: string,
    actions: UpdateSliceActionType<ResponseType>
  ) =>
  async (dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject, updateOneInList } = actions;
    dispatch(request());

    const token = localStorage.getItem("token");

    await axios
      .put(url, data, {headers: {Authorization: "Bearer " + token}})
      .then((res) => {
        const { data: responseData, message } = res.data;
        dispatch(success(responseData));
        if (updateOneInList)  dispatch(updateOneInList({ index, data: responseData }));
        dispatch(addOneNotification({ type: "success", message }));
      })
      .catch((err) => {
        handleLogoutIfUnauthorized(err)
        const errorMessage = err.response.data.message;
        dispatch(reject(err.message));
        dispatch(addOneNotification({ type: "error", message: errorMessage }));
      });
  };

export default globalUpdateAction;
