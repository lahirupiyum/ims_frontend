import { MobileAssetRequest, MobileAssetResponse } from "../../../../types/Inventory/asset/ModileAssets";
import { mobileAssetUrl } from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { mobilekAssetAddOneToList } from "./page";

const mobileAssetCreateSlice =
getCreateSlice<MobileAssetResponse>("mobileAssetCreate");

const { request, success, reject } = mobileAssetCreateSlice.actions;

const createActionTypes: CreateSliceActionType<MobileAssetResponse> = {
request,
success,
reject,
addOnetoList: mobilekAssetAddOneToList,
};

export const mobileAssetCreateAction = (data: MobileAssetRequest) =>
globalCreateAction<MobileAssetRequest, MobileAssetResponse>(
    data,
    mobileAssetUrl,
    createActionTypes
);

export const { reset: mobileAssetCreateReset } = mobileAssetCreateSlice.actions;
export default mobileAssetCreateSlice.reducer;