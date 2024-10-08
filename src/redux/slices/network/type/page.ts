import { NetworkDeviceTypeResponse } from "../../../../types/NetworkDeviceType";
import { networkDeviceTypeUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction, {
  PageReponse,
} from "../../../actions/globalPageAction";
import SliceActionType from "../../../actions/sliceActionType";
import getPageSlice from "../../config/globalPageSlice";

const typePageSlice = getPageSlice<NetworkDeviceTypeResponse>(
  "networkDeviceTypePage"
);

const { request, success, reject } = typePageSlice.actions;

const pageActions: SliceActionType<PageReponse<NetworkDeviceTypeResponse>> = {
  request,
  success,
  reject,
};

export const typePageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceTypeUrl, pageActions);

export const { reset: typePageReset } = typePageSlice.actions;
export default typePageSlice.reducer;