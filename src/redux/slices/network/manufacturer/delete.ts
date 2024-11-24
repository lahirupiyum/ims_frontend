import { NetworkDeviceManufacturerResponse } from "../../../../types/NetworkDeviceManufacturer";
import { networkDeviceManufacturerWithIdUrl } from "../../../../utils/url-properties/urls/network";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { manufacturerPageAction } from "./page";

const networkDeviceManufacturerDeleteSlice =
  getDeleteSlice<NetworkDeviceManufacturerResponse>(
    "networkDeviceManufacturerDelete"
  );

const { request, success, reject } =
  networkDeviceManufacturerDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<NetworkDeviceManufacturerResponse> =
  {
    request,
    success,
    reject,
  };

export const networkDeviceManufacturerDeleteAction = (id: number) =>
  globalDeleteAction(
    networkDeviceManufacturerWithIdUrl(id),
    deleteActionTypes,
    manufacturerPageAction
  );


export const { reset: networkDeviceManufacturerDeleteReset } = networkDeviceManufacturerDeleteSlice.actions;
export default networkDeviceManufacturerDeleteSlice.reducer;