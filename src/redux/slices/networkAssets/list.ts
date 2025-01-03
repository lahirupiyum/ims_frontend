import { NetworkAssetResponse } from "../../../types/Inventory/asset/NetworkAssets";
import { networkAssetListUrl } from "../../../utils/url-properties/urls/network";
import globalListAction from "../../actions/globalListAction";
import ListSliceActionType from "../../types/ListActionType";
import getListSlice from "../config/globalListSlice";

const networkAssetListSlice = getListSlice<NetworkAssetResponse>("networkAssetList");

const { request, success, reject } = networkAssetListSlice.actions;

const listActionTypes: ListSliceActionType<NetworkAssetResponse> = {
    request,
    success,
    reject
};

export const networkAssetListAction = () => globalListAction<NetworkAssetResponse>(networkAssetListUrl, listActionTypes);

export const { reset: networkAssetListReset } = networkAssetListSlice.actions;
export default networkAssetListSlice.reducer;