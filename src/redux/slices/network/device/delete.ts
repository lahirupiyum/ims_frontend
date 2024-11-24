import { NetworkDeviceResponse } from "../../../../types/NetworkDevice";
import { networkDeviceWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { networkDevicePageAction } from "./page";

const networkDeviceDeleteSlice = getDeleteSlice<NetworkDeviceResponse>(
  "networkDeviceDelete"
);

const { request, success, reject } = networkDeviceDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<NetworkDeviceResponse> = {
  request,
  success,
  reject,
};

export const networkDeviceDeleteAction = (id: number) =>
  globalDeleteAction(
    networkDeviceWithIdUrl(id),
    deleteActionTypes,
    networkDevicePageAction
  );


export const { reset: networkDeviceDeleteReset } = networkDeviceDeleteSlice.actions;
export default networkDeviceDeleteSlice.reducer;