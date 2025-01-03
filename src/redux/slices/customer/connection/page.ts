import { ConnectionResponse } from "../../../../types/customer/Connection";
import { connectionUrl } from "../../../../utils/url-properties/urls/customer/service";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const connectionPageSlice = getPageSlice<ConnectionResponse>("connectionPage");
const { request, success, reject } = connectionPageSlice.actions;

const pageActionTypes: PageSliceActionType<ConnectionResponse> = {
  request,
  success,
  reject,
};

export const connectionPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, connectionUrl, pageActionTypes);

export const {
  reset: connectionPageReset,
  create: connectionAddOneToList,
  update: connectionUpdateOneInList,
} = connectionPageSlice.actions;

export default connectionPageSlice.reducer;
