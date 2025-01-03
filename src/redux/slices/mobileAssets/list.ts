import { MobileAssetResponse } from "../../../types/Inventory/asset/ModileAssets";
import { mobileAssetListUrl } from "../../../utils/url-properties/urls/mobileAssets";
import globalListAction from "../../actions/globalListAction";
import ListSliceActionType from "../../types/ListActionType";
import getListSlice from "../config/globalListSlice";

const mobileListSlice = getListSlice<MobileAssetResponse>("mobileList");

const { request, success, reject } = mobileListSlice.actions;

const listActionTypes: ListSliceActionType<MobileAssetResponse> = {
    request,
    success,
    reject
};

export const mobileListAction = () => globalListAction<MobileAssetResponse>(mobileAssetListUrl, listActionTypes);

export const { reset: mobileListReset } = mobileListSlice.actions;
export default mobileListSlice.reducer;