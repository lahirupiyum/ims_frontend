import { NetworkDeviceManufacturerResponse } from "../../../../types/NetworkDeviceManufacturer";
import { networkDeviceManufacturerUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const manufacturerPageSlice =
  getPageSlice<NetworkDeviceManufacturerResponse>("manufacturerPage");

const { request, success, reject } = manufacturerPageSlice.actions;

const pageActions: PageSliceActionType<NetworkDeviceManufacturerResponse>
 = {
  request,
  success,
  reject,
};

export const manufacturerPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceManufacturerUrl, pageActions);

export const { reset: manufacturerPageReset } = manufacturerPageSlice.actions;
export default manufacturerPageSlice.reducer;
