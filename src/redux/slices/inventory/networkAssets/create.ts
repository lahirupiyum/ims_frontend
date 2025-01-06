import {
  NetworkAssetRequest,
  NetworkAssetResponse,
} from "../../../../types/Inventory/asset/NetworkAssets";
import { networkAssetUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { networkAssetAddOneToList } from "./page";

const networkAssetCreateSlice =
  getCreateSlice<NetworkAssetResponse>("networkAssetCreate");

const { request, success, reject } = networkAssetCreateSlice.actions;

const createActionTypes: CreateSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
  addOnetoList: networkAssetAddOneToList,
};

export const networkAssetCreateAction = (data: NetworkAssetRequest) =>
  globalCreateAction<NetworkAssetRequest, NetworkAssetResponse>(
    data,
    networkAssetUrl,
    createActionTypes
  );

export const { reset: networkAssetCreateReset } = networkAssetCreateSlice.actions;
export default networkAssetCreateSlice.reducer;