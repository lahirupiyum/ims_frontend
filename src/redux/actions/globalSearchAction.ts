import axios from "axios";
import { useAppDispatch } from "../hooks";
import { addOneNotification } from "../slices/notificationSlice";
import ListSliceActionType from "../types/ListActionType";

const globalSearchAction =
  <ResponseType>(
    key: string,
    url: string,
    sliceActions: ListSliceActionType<ResponseType>
  ) =>
  async (dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = sliceActions;
    dispatch(request());

    await axios
      .get(url, { params: { key } })
      .then((res) => {
        const response: ResponseType[] = res.data.data;
        dispatch(success(response));
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        dispatch(reject(errorMessage));
        dispatch(addOneNotification({ type: "error", message: errorMessage }));
      });
  };

export default globalSearchAction;
