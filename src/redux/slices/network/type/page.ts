import { NetworkDeviceTypeResponse } from "../../../../types/NetworkDeviceType";
import { networkDeviceTypeUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const typePageSlice = getPageSlice<NetworkDeviceTypeResponse>(
  "networkDeviceTypePage"
);

const { request, success, reject } = typePageSlice.actions;

const pageActions: PageSliceActionType<NetworkDeviceTypeResponse> = {
  request,
  success,
  reject,
};

export const typePageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceTypeUrl, pageActions);

export const { reset: typePageReset, create: networkDeviceTypeAddOneToList, update: networkDeviceTypeUpdateOneInList } = typePageSlice.actions;
export default typePageSlice.reducer;