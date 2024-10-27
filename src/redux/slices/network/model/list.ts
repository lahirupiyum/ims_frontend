import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";
import { networkDeviceModelListUrl } from "../../../../utils/url-properties/urls/network";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const networkDeviceModelListSlice =
  getListSlice<NetworkDeviceModelResponse>(
    "networkDeviceModelList"
  );

const { request, success, reject } = networkDeviceModelListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkDeviceModelResponse> =
  {
    request,
    success,
    reject,
  };

export const networkDeviceModelListAction = () =>
  globalListAction<NetworkDeviceModelResponse>(
    networkDeviceModelListUrl,
    listActionTypes
  );

export const { reset: networkDeviceModelListReset } =
  networkDeviceModelListSlice.actions;
export default networkDeviceModelListSlice.reducer;
