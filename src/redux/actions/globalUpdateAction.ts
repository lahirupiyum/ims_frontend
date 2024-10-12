import axios from "axios";
import { useAppDispatch } from "../hooks";
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
        const { data: responseData } = res.data;
        dispatch(success(responseData));
        dispatch(updateOneInList({index, data: responseData}));
      })
      .catch((err) => {
        dispatch(reject(err.message));
      });
  };

export default globalUpdateAction;
