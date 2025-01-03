import { MobileAssetResponse } from "../../../types/Inventory/asset/ModileAssets";
import { mobileAssetUrl } from "../../../utils/url-properties/urls/mobileAssets";
import globalPageAction from "../../actions/globalPageAction";
import PageSliceActionType from "../../types/PageActionType";
import getPageSlice from "../config/globalPageSlice";

const mobileAssetPageSlice = getPageSlice<MobileAssetResponse>("mobileAssetPage");

const { request, success, reject } = mobileAssetPageSlice.actions;

const pageActionTypes: PageSliceActionType<MobileAssetResponse> = {
  request,
  success,
  reject,
};

export const mobileAssetPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, mobileAssetUrl, pageActionTypes);

export const { reset: mobileAssetPageReset, create: mobilekAssetAddOneToList, update: mobileAssetUpdateOneInList } = mobileAssetPageSlice.actions;
export default mobileAssetPageSlice.reducer;