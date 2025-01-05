import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import {
  networkAssetListUrl,
  networkAssetSearchUrl,
  peRouterListUrl,
} from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
import globalSearchAction from "../../../actions/globalSearchAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const networkAssetListSlice =
  getListSlice<NetworkAssetResponse>("networkAssetList");

const { request, success, reject } = networkAssetListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
};

export const networkAssetListAction = () =>
  globalListAction<NetworkAssetResponse>(networkAssetListUrl, listActionTypes);

export const networkAssetSearchAction = (key: string) =>
  globalSearchAction<NetworkAssetResponse>(
    key,
    networkAssetSearchUrl,
    listActionTypes
  );

export const peRouterListAction = () =>
  globalListAction(peRouterListUrl, listActionTypes);

export const { reset: networkAssetListReset } = networkAssetListSlice.actions;
export default networkAssetListSlice.reducer;
