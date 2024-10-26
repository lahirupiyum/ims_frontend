import {
  NetworkDeviceRequest,
  NetworkDeviceResponse,
} from "../../../../types/NetworkDevice";
import { networkDeviceWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { networkDeviceUpdateOneInList } from "./page";

const networkDeviceUpdateSlice = getUpdateSlice<NetworkDeviceResponse>(
  "networkDeviceUpdate"
);

const { request, success, reject } = networkDeviceUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<NetworkDeviceResponse> = {
  request,
  success,
  reject,
  updateOneInList: networkDeviceUpdateOneInList,
};

export const networkDeviceUpdateAction = (
  id: number,
  data: NetworkDeviceRequest,
  index: number
) =>
  globalUpdateAction<NetworkDeviceRequest, NetworkDeviceResponse>(
    index,
    data,
    networkDeviceWithIdUrl(id),
    updateActionTypes
  );

export const { reset: networkDeviceUpdateReset } =
  networkDeviceUpdateSlice.actions;
export default networkDeviceUpdateSlice.reducer;
