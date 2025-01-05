import {
  NetworkAssetRequest,
  NetworkAssetResponse,
} from "../../../../types/Inventory/asset/NetworkAssets";
import { networkAssetWithIdUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { networkAssetUpdateOneInList } from "./page";

const networkAssetUpdateSlice =
  getUpdateSlice<NetworkAssetResponse>("networkAssetUpdate");

const { request, success, reject } = networkAssetUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
  updateOneInList: networkAssetUpdateOneInList,
};

export const networkAssetUpdateAction = (
  id: number,
  data: NetworkAssetRequest,
  index: number
) =>
  globalUpdateAction<NetworkAssetRequest, NetworkAssetResponse>(
    index,
    data,
    networkAssetWithIdUrl(id),
    updateActionTypes
  );

export const { reset: networkAssetUpdateReset } = networkAssetUpdateSlice.actions;
export default networkAssetUpdateSlice.reducer;