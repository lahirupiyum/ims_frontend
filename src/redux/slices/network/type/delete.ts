import { NetworkDeviceTypeResponse } from "../../../../types/NetworkDeviceType";
import { networkDeviceTypeWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { typePageAction } from "./page";

const networkDeviceTypeDeleteSlice = getDeleteSlice<NetworkDeviceTypeResponse>(
  "networkDeviceTypeDelete"
);

const { request, success, reject } = networkDeviceTypeDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<NetworkDeviceTypeResponse> = {
  request,
  success,
  reject,
};

export const networkDeviceTypeDeleteAction = (id: number) =>
  globalDeleteAction(
    networkDeviceTypeWithIdUrl(id),
    deleteActionTypes,
    typePageAction
  );

export const { reset: networkDeviceTypeDeleteReset } =
  networkDeviceTypeDeleteSlice.actions;
export default networkDeviceTypeDeleteSlice.reducer;
