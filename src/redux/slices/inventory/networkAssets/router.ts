import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import { routerAvailableListUrl, routerListUrl, routerSearchUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
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

export const networkRouterAvailableListAction = () => globalListAction(routerAvailableListUrl, listActionTypes);

export const networkRouterListAction = () => globalListAction(routerListUrl, listActionTypes);

export const { reset: networkRouterListReset } = networkRouterListSlice.actions;

export default networkRouterListSlice.reducer;
