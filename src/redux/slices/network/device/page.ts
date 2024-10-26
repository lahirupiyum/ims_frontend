import { NetworkDeviceResponse } from "../../../../types/NetworkDevice";
import { networkDeviceUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const networkDevicePageSlice =
  getPageSlice<NetworkDeviceResponse>("networkDevicePage");

const { request, success, reject } = networkDevicePageSlice.actions;

export const pageActions: PageSliceActionType<NetworkDeviceResponse> =
  {
    request,
    success,
    reject,
  };

export const networkDevicePageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceUrl, pageActions);

export const { reset: networkDevicePageReset, create: networkDeviceAddOneToList, update: networkDeviceUpdateOneInList } = networkDevicePageSlice.actions;
export default networkDevicePageSlice.reducer;
