import { FixedAssetResponse } from "../../../types/Inventory/asset/FixedAssets";
import { fixedAssetListUrl } from "../../../utils/url-properties/urls/fixedAssests";
import globalListAction from "../../actions/globalListAction";
import ListSliceActionType from "../../types/ListActionType";
import getListSlice from "../config/globalListSlice";

const fixedAssetListSlice = getListSlice<FixedAssetResponse>("fixedAssetList");

const { request, success, reject } = fixedAssetListSlice.actions;

const listActionTypes: ListSliceActionType<FixedAssetResponse> = {
    request,
    success,
    reject
};

export const fixedAssetListAction = () => globalListAction<FixedAssetResponse>(fixedAssetListUrl, listActionTypes);

export const { reset: fixedAssetListReset } = fixedAssetListSlice.actions;
export default fixedAssetListSlice.reducer;