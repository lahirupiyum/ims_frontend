import {
  NetworkDeviceModelRequest,
  NetworkDeviceModelResponse,
} from "../../../../types/NetworkDeviceModel";
import { networkDeviceModelUrl } from "../../../../utils/url-properties/urls/network";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { networkDeviceModelAddOneToList } from "./page";

const networkDeviceModelCreateSlice =
  getCreateSlice<NetworkDeviceModelResponse>("networkDeviceModelCreate");

const { request, success, reject } = networkDeviceModelCreateSlice.actions;

const createActionTypes: CreateSliceActionType<NetworkDeviceModelResponse> = {
  request,
  success,
  reject,
  addOnetoList: networkDeviceModelAddOneToList,
};

export const networkDeviceModelCreateAction = (
  data: NetworkDeviceModelRequest
) =>
  globalCreateAction<NetworkDeviceModelRequest, NetworkDeviceModelResponse>(
    data,
    networkDeviceModelUrl,
    createActionTypes
  );

export const { reset: networkDeviceModelCreateReset } = networkDeviceModelCreateSlice.actions;
export default networkDeviceModelCreateSlice.reducer;