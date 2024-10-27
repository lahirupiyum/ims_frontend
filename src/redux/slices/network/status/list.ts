import { NetworkDeviceStatusResponse } from "../../../../types/NetworkDeviceStatus";
import { networkDeviceStatusListUrl } from "../../../../utils/url-properties/urls/network";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const networkDeviceStatusListSlice = getListSlice<NetworkDeviceStatusResponse>(
  "networkDeviceStatusList"
);

const { request, success, reject } = networkDeviceStatusListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkDeviceStatusResponse> = {
  request,
  success,
  reject,
};

export const networkDeviceStatusListAction = () =>
  globalListAction<NetworkDeviceStatusResponse>(
    networkDeviceStatusListUrl,
    listActionTypes
  );

export const { reset: networkDeviceStatusListReset } =
  networkDeviceStatusListSlice.actions;
export default networkDeviceStatusListSlice.reducer;
