import {
  NetworkDeviceRequest,
  NetworkDeviceResponse,
} from "../../../../types/NetworkDevice";
import { networkDeviceUrl } from "../../../../utils/url-properties/urls/network";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { networkDeviceAddOneToList } from "./page";

const networkDeviceCreateSlice = getCreateSlice<NetworkDeviceResponse>(
  "networkDeviceCreate"
);

const { request, success, reject } = networkDeviceCreateSlice.actions;

const createActionTypes: CreateSliceActionType<NetworkDeviceResponse> = {
  request,
  success,
  reject,
  addOnetoList: networkDeviceAddOneToList,
};

export const networkDeviceCreateAction = (data: NetworkDeviceRequest) =>
  globalCreateAction<NetworkDeviceRequest, NetworkDeviceResponse>(
    data,
    networkDeviceUrl,
    createActionTypes
  );

export const { reset: networkDeviceCreateReset } = networkDeviceCreateSlice.actions;
export default networkDeviceCreateSlice.reducer;