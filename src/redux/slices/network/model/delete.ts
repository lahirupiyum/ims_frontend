import { NetworkDeviceModelResponse } from "../../../../types/NetworkDeviceModel";
import { networkDeviceModelWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { modelPageAction } from "./page";

const networkDeviceModelDeleteSlice =
  getDeleteSlice<NetworkDeviceModelResponse>("networkDeviceModel");
const { request, success, reject } = networkDeviceModelDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<NetworkDeviceModelResponse> = {
  request,
  success,
  reject,
};

export const networkDeviceModelDeleteAction = (id: number) =>
  globalDeleteAction(
    networkDeviceModelWithIdUrl(id),
    deleteActionTypes,
    modelPageAction
  );

export const { reset: networkDeviceModelDeleteReset } =
  networkDeviceModelDeleteSlice.actions;
export default networkDeviceModelDeleteSlice.reducer;
