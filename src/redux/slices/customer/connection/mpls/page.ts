import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { mplsConnectionUrl } from "../../../../../utils/url-properties/urls/customer/service";
import globalPageAction from "../../../../actions/globalPageAction";
import PageSliceActionType from "../../../../types/PageActionType";
import getPageSlice from "../../../config/globalPageSlice";

const mplsConnectionPageSlice =
  getPageSlice<ConnectionResponse>("mplsConnectionPage");

const { request, success, reject } = mplsConnectionPageSlice.actions;

const pageActionTypes: PageSliceActionType<ConnectionResponse> = {
  request,
  success,
  reject,
};

export const mplsConnectionPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, mplsConnectionUrl, pageActionTypes);

export const {
  reset: mplsConnectionPageReset,
  create: mplsConnectionAddOneToList,
  update: mplsConnectionUpdateOneInList,
} = mplsConnectionPageSlice.actions;

export default mplsConnectionPageSlice.reducer;
