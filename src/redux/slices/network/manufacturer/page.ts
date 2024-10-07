import { NetworkDeviceManufacturerResponse } from "../../../../types/NetworkDeviceManufacturer";
import { networkDeviceManufacturerUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction, {
  PageReponse,
} from "../../../actions/globalPageAction";
import SliceActionType from "../../../actions/sliceActionType";
import getPageSlice from "../../config/globalPageSlice";

const manufacturerPageSlice =
  getPageSlice<NetworkDeviceManufacturerResponse>("manufacturerPage");

const { request, success, reject } = manufacturerPageSlice.actions;

const pageActions: SliceActionType<
  PageReponse<NetworkDeviceManufacturerResponse>
> = {
  request,
  success,
  reject,
};

export const manufacturerPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkDeviceManufacturerUrl, pageActions);

export const { reset: manufacturerPageReset } = manufacturerPageSlice.actions;
export default manufacturerPageSlice.reducer;
