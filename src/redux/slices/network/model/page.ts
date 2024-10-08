import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";
import { networkDeviceModelUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction, {
  PageReponse,
} from "../../../actions/globalPageAction";
import SliceActionType from "../../../actions/sliceActionType";
import getPageSlice from "../../config/globalPageSlice";

const modelPageSlice =
  getPageSlice<NetworkDeviceModelResponse>("networkDeviceModel");

const { request, success, reject } = modelPageSlice.actions;

const pageActions: SliceActionType<PageReponse<NetworkDeviceModelResponse>> = {
  request,
  success,
  reject,
};

export const modelPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceModelUrl, pageActions);

export const { reset: modelPageReset } = modelPageSlice.actions;
export default modelPageSlice.reducer;