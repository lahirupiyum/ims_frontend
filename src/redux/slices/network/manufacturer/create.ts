import {
  NetworkDeviceManufacturerRequest,
  NetworkDeviceManufacturerResponse,
} from "../../../../types/NetworkDeviceManufacturer";
import { networkDeviceManufacturerUrl } from "../../../../utils/url-properties/urls/network";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { manufacturerAddOneToList } from "./page";

const networkDeviceManufacturerCreateSlice =
  getCreateSlice<NetworkDeviceManufacturerResponse>(
    "networkDeviceManufacturerCreate"
  );

const { request, success, reject } =
  networkDeviceManufacturerCreateSlice.actions;

const createActionTypes: CreateSliceActionType<NetworkDeviceManufacturerResponse> =
  {
    request,
    success,
    reject,
    addOnetoList: manufacturerAddOneToList,
  };

export const networkDeviceManufacturerCreateAction = (
  data: NetworkDeviceManufacturerRequest
) =>
  globalCreateAction<
    NetworkDeviceManufacturerRequest,
    NetworkDeviceManufacturerResponse
  >(data, networkDeviceManufacturerUrl, createActionTypes);

export const { reset: networkDeviceManufacturerCreateReset } = networkDeviceManufacturerCreateSlice.actions;
export default networkDeviceManufacturerCreateSlice.reducer;