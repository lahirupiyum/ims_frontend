import { NetworkDeviceManufacturerResponse } from "../../../../types/NetworkDeviceManufacturer";
import { networkDeviceManufacturerListUrl } from "../../../../utils/url-properties/urls/network";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const networkDeviceManufacturerListSlice =
  getListSlice<NetworkDeviceManufacturerResponse>(
    "networkDeviceManufacturerList"
  );

const { request, success, reject } = networkDeviceManufacturerListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkDeviceManufacturerResponse> =
  {
    request,
    success,
    reject,
  };

export const networkDeviceManufacturerListAction = () =>
  globalListAction<NetworkDeviceManufacturerResponse>(
    networkDeviceManufacturerListUrl,
    listActionTypes
  );

export const { reset: manufacturerListReset } =
  networkDeviceManufacturerListSlice.actions;
export default networkDeviceManufacturerListSlice.reducer;
