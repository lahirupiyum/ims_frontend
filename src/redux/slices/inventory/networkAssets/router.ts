import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import { routerSearchUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalSearchAction from "../../../actions/globalSearchAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const networkRouterListSlice = getListSlice<NetworkAssetResponse>("networkRouterList");

const { request, success, reject } = networkRouterListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
};

export const networkRouterSearchAction = (serialNumber: string) =>
  globalSearchAction(serialNumber, routerSearchUrl, listActionTypes);

export const { reset: networkRouterListReset } = networkRouterListSlice.actions;

export default networkRouterListSlice.reducer;
