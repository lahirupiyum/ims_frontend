import axios from "axios";
import { useAppDispatch } from "../hooks";
import DeleteSliceActionType from "../types/DeleteActionType";

const globalDeleteAction =
  <ResponseType>(
    url: string,
    actionTypes: DeleteSliceActionType<ResponseType>,
    pageAction: (
        page: number,
        pageSize: number
      ) => (dispath: ReturnType<typeof useAppDispatch>) => Promise<void>
  ) =>
  async (dispatch: ReturnType<typeof useAppDispatch>) => {
    const { request, success, reject } = actionTypes;
    dispatch(request());
    await axios.delete(url)
    .then(res => {
        const { data: responseData } = res.data;
        dispatch(success(responseData));
        dispatch(pageAction(0, 10));
    })
    .catch(err => {
        dispatch(reject(err.message));
    })
  };

  export default globalDeleteAction;