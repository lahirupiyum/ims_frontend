import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";
import { networkDeviceModelUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const modelPageSlice =
  getPageSlice<NetworkDeviceModelResponse>("networkDeviceModel");

const { request, success, reject } = modelPageSlice.actions;

const pageActions: PageSliceActionType<NetworkDeviceModelResponse> = {
  request,
  success,
  reject,
};

export const modelPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceModelUrl, pageActions);

export const { reset: modelPageReset, create: networkDeviceModelAddOneToList, update: networkDeviceModelUpdateOneInList } = modelPageSlice.actions;
export default modelPageSlice.reducer;