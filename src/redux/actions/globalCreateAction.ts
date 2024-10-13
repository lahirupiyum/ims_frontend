import axios from "axios";
import { useAppDispatch } from "../hooks";
import CreateSliceActionType from "../types/CreateActionType";
import { addOneNotification } from "../slices/notificationSlice";

const globalCreateAction =
  <RequestType, ResponseType>(
    data: RequestType,
    url: string,
    actions: CreateSliceActionType<ResponseType>
  ) =>
  async (dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject, addOnetoList } = actions;
    dispatch(request());
    await axios
      .post(url, data)
      .then((res) => {
        const { data: responseData } = res.data;
        dispatch(success(responseData));
        dispatch(addOnetoList(responseData));
        dispatch(addOneNotification({type:"success", message:"Badu have been added!"}));
      })
      .catch((err) => {
        const message = err.response.data.message;
        dispatch(reject(err.message));
        dispatch(addOneNotification({type:"error", message}));
      });
  };

export default globalCreateAction;
