import {
  NetowrkDeviceTypeRequest,
  NetworkDeviceTypeResponse,
} from "../../../../types/NetworkDeviceType";
import { networkDeviceTypeUrl } from "../../../../utils/url-properties/urls/network";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { networkDeviceTypeAddOneToList } from "./page";

const networkDeviceTypeCreateSlice = getCreateSlice<NetworkDeviceTypeResponse>(
  "networkDeviceTypeCreate"
);

const { request, success, reject } = networkDeviceTypeCreateSlice.actions;

const createSliceActionTypes: CreateSliceActionType<NetworkDeviceTypeResponse> =
  {
    request,
    success,
    reject,
    addOnetoList: networkDeviceTypeAddOneToList,
  };

export const networkDeviceTypeCreateAction = (data: NetowrkDeviceTypeRequest) =>
  globalCreateAction<NetowrkDeviceTypeRequest, NetworkDeviceTypeResponse>(
    data,
    networkDeviceTypeUrl,
    createSliceActionTypes
  );

export const { reset: networkDeviceTypeCreateReset } =
  networkDeviceTypeCreateSlice.actions;

export default networkDeviceTypeCreateSlice.reducer;
