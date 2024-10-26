import {
  NetworkDeviceManufacturerRequest,
  NetworkDeviceManufacturerResponse,
} from "../../../../types/NetworkDeviceManufacturer";
import { networkDeviceManufacturerWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { manufacturerUpdateOneInTheList } from "./page";

const networkDeviceManufacturerUpdateSlice =
  getUpdateSlice<NetworkDeviceManufacturerResponse>(
    "networkDeviceManufacturerUpdate"
  );

const { request, success, reject } =
  networkDeviceManufacturerUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<NetworkDeviceManufacturerResponse> =
  {
    request,
    success,
    reject,
    updateOneInList: manufacturerUpdateOneInTheList,
  };

export const networkDeviceManufacturerUpdateAction = (
  id: number,
  data: NetworkDeviceManufacturerRequest,
  index: number
) =>
  globalUpdateAction<
    NetworkDeviceManufacturerRequest,
    NetworkDeviceManufacturerResponse
  >(index, data, networkDeviceManufacturerWithIdUrl(id), updateActionTypes);

export const { reset: networkDeviceManufacturerUpdateReset } =
  networkDeviceManufacturerUpdateSlice.actions;
export default networkDeviceManufacturerUpdateSlice.reducer;
