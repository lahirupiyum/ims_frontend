import axios from "axios";
import { useAppDispatch } from "../hooks";
import { addOneNotification } from "../slices/notificationSlice";
import UpdateSliceActionType from "../types/UpdateActionType";

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
    await axios
      .put(url, data)
      .then((res) => {
        const { data: responseData, message } = res.data;
        dispatch(success(responseData));
        if (updateOneInList)  dispatch(updateOneInList({ index, data: responseData }));
        dispatch(addOneNotification({ type: "success", message }));
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        dispatch(reject(err.message));
        dispatch(addOneNotification({ type: "error", message: errorMessage }));
      });
  };

export default globalUpdateAction;
