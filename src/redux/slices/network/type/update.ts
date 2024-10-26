import {
  NetowrkDeviceTypeRequest,
  NetworkDeviceTypeResponse,
} from "../../../../types/NetworkDeviceType";
import { networkDeviceTypeWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { networkDeviceTypeUpdateOneInList } from "./page";

const networkDeviceTypeUpdateSlice = getUpdateSlice<NetworkDeviceTypeResponse>(
  "networkDeviceTypeUpdateSlice"
);

const { request, success, reject } = networkDeviceTypeUpdateSlice.actions;

const networkDeviceTypeUpdateActionTypes: UpdateSliceActionType<NetworkDeviceTypeResponse> =
  {
    request,
    success,
    reject,
    updateOneInList: networkDeviceTypeUpdateOneInList,
  };

export const networkDeviceTypeUpdateAction = (
  id: number,
  data: NetowrkDeviceTypeRequest,
  index: number
) =>
  globalUpdateAction<NetowrkDeviceTypeRequest, NetworkDeviceTypeResponse>(
    index,
    data,
    networkDeviceTypeWithIdUrl(id),
    networkDeviceTypeUpdateActionTypes
  );

  export const { reset: networkDeviceTypeUpdateReset } = networkDeviceTypeUpdateSlice.actions;

  export default networkDeviceTypeUpdateSlice.reducer;