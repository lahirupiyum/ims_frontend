import { NetworkAssetResponse } from "../../../types/Inventory/asset/NetworkAssets";
import { networkAssetWithIdUrl } from "../../../utils/url-properties/urls/network";
import globalDeleteAction from "../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../types/DeleteActionType";
import getDeleteSlice from "../config/globalDeleteSlice";
import { networkAssetPageAction } from "./page";

const networkAssetDeleteSlice = getDeleteSlice<NetworkAssetResponse>("networkAssetDelete");

const { request, success, reject } = networkAssetDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
};

export const networkAssetDeleteAction = (id: number) =>
  globalDeleteAction<NetworkAssetResponse>(
    networkAssetWithIdUrl(id),
    deleteActionTypes,
    networkAssetPageAction
  );

export const { reset: networkAssetDeleteReset } = networkAssetDeleteSlice.actions;
export default networkAssetDeleteSlice.reducer;
