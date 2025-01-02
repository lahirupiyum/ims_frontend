import { MobileAssetResponse } from "../../../types/Inventory/asset/ModileAssets";
import { mobileAssetWithIdUrl } from "../../../utils/url-properties/urls/mobileAssets";
import globalDeleteAction from "../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../types/DeleteActionType";
import getDeleteSlice from "../config/globalDeleteSlice";
import { mobileAssetPageAction } from "./page";

const mobileAssetDeleteSlice = getDeleteSlice<MobileAssetResponse>("mobileAssetDelete");

const { request, success, reject } = mobileAssetDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<MobileAssetResponse> = {
  request,
  success,
  reject,
};

export const mobileAssetDeleteAction = (id: number) =>
  globalDeleteAction<MobileAssetResponse>(
    mobileAssetWithIdUrl(id),
    deleteActionTypes,
    mobileAssetPageAction
  );

export const { reset: mobileAssetDeleteReset } = mobileAssetDeleteSlice.actions;
export default mobileAssetDeleteSlice.reducer;
