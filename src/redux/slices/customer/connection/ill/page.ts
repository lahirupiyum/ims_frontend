import { ConnectionResponse } from "../../../../../types/customer/Connection";
import { illConnectionUrl } from "../../../../../utils/url-properties/urls/customer/service";
import globalPageAction from "../../../../actions/globalPageAction";
import PageSliceActionType from "../../../../types/PageActionType";
import getPageSlice from "../../../config/globalPageSlice";

const illConnectionPageSlice =
  getPageSlice<ConnectionResponse>("illConnectionPage");

const { request, success, reject } = illConnectionPageSlice.actions;

const pageActionTypes: PageSliceActionType<ConnectionResponse> = {
  request,
  success,
  reject,
};

export const illConnectionPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, illConnectionUrl, pageActionTypes);

export const {
  reset: illConnectionPageReset,
  create: illConnectionAddOneToList,
  update: illConnectionUpdaetOneInList,
} = illConnectionPageSlice.actions;
export default illConnectionPageSlice.reducer;
