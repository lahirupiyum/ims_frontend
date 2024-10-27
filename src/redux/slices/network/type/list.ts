import getListSlice from "../../config/globalListSlice";
import { NetworkDeviceTypeResponse } from "../../../../types/NetworkDeviceType";
import globalListAction from "../../../actions/globalListAction";
import { networkDeviceTypeListUrl } from "../../../../utils/url-properties/urls/network";
import ListSliceActionType from "../../../types/ListActionType";

const networkDeviceTypeListSlice = getListSlice<NetworkDeviceTypeResponse>(
  "networkDeviceTypeList"
);

const { request, success, reject } = networkDeviceTypeListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkDeviceTypeResponse> = {
  request,
  success,
  reject,
};

export const networkDeviceTypeListAction = () =>
  globalListAction<NetworkDeviceTypeResponse>(
    networkDeviceTypeListUrl,
    listActionTypes
  );


export const { reset: networkDevicelistReset } = networkDeviceTypeListSlice.actions;
export default networkDeviceTypeListSlice.reducer;