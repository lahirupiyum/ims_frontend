import {
  NetworkDeviceModelRequest,
  NetworkDeviceModelResponse,
} from "../../../../types/NetworkDeviceModel";
import { networkDeviceModelWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { networkDeviceModelUpdateOneInList } from "./page";

const networkDeviceModelUpdateSlice =
  getUpdateSlice<NetworkDeviceModelResponse>("networkDeviceModelUpdate");

const { request, success, reject } = networkDeviceModelUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<NetworkDeviceModelResponse> = {
  request,
  success,
  reject,
  updateOneInList: networkDeviceModelUpdateOneInList,
};

export const networkDeviceModelUpdateAction = (
  id: number,
  data: NetworkDeviceModelRequest,
  index: number
) =>
  globalUpdateAction<NetworkDeviceModelRequest, NetworkDeviceModelResponse>(
    index,
    data,
    networkDeviceModelWithIdUrl(id),
    updateActionTypes
  );

export const { reset: networkDeviceModelUpdateReset } =
  networkDeviceModelUpdateSlice.actions;
export default networkDeviceModelUpdateSlice.reducer;
