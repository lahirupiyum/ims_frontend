import axios from "axios";
import { useDispatch } from "react-redux";
import { addOneNotification } from "../slices/notificationSlice";
import SearchPageSliceActionType from "../types/SearchActionType";
import { handleLogoutIfUnauthorized } from "./utils";

const globalSearchPageAction =
  <ResponseType>(
    key: string,
    url: string,
    sliceActions: SearchPageSliceActionType<ResponseType>
  ) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    const { request, success, reject } = sliceActions;
    dispatch(request());

    const token = localStorage.getItem("token");

    await axios
      .get(url, {
        params: { key },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const responseData: ResponseType[] = res.data.data;
        dispatch(success(responseData));
      })
      .catch((err) => {
        handleLogoutIfUnauthorized(err);
        const errorMessage = err.response.data.message;
        dispatch(reject(errorMessage));
        dispatch(addOneNotification({ type: "error", message: errorMessage }));
      });
  };

export default globalSearchPageAction;
