import axios from "axios";
import { useAppDispatch } from "../hooks";
import CreateSliceActionType from "../types/CreateActionType";

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
      })
      .catch((err) => {
        dispatch(reject(err.message));
      });
  };

export default globalCreateAction;
