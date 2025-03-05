import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import { switchListUrl, switchSearchUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
import globalSearchAction from "../../../actions/globalSearchAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const networkSwitchListSlice =
  getListSlice<NetworkAssetResponse>("networkSwitchList");

const { request, success, reject } = networkSwitchListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
};

export const networkSwitchSearchAction = (serialNumber: string) =>
  globalSearchAction(serialNumber, switchSearchUrl, listActionTypes);

export const networkSwtichListAction = () =>
  globalListAction(switchListUrl, listActionTypes);

export const { reset: networkSwitchListReset } = networkSwitchListSlice.actions;

export default networkSwitchListSlice.reducer;
