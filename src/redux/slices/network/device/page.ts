import { NetworkDeviceResponse } from "../../../../types/NetworkDevice";
import { networkDeviceUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction, {
  PageReponse,
} from "../../../actions/globalPageAction";
import SliceActionType from "../../../actions/sliceActionType";
import getPageSlice from "../../config/globalPageSlice";

const networkDevicePageSlice =
  getPageSlice<NetworkDeviceResponse>("networkDevicePage");

const { request, success, reject } = networkDevicePageSlice.actions;

export const pageActions: SliceActionType<PageReponse<NetworkDeviceResponse>> =
  {
    request,
    success,
    reject,
  };

export const networkDevicePageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceUrl, pageActions);

export const { reset: networkDevicePageReset } = networkDevicePageSlice.actions;
export default networkDevicePageSlice.reducer;
