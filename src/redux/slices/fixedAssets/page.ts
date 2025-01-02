import { FixedAssetResponse } from "../../../types/Inventory/asset/FixedAssets";
import { fixedAssetUrl } from "../../../utils/url-properties/urls/fixedAssests";
import globalPageAction from "../../actions/globalPageAction";
import PageSliceActionType from "../../types/PageActionType";
import getPageSlice from "../config/globalPageSlice";

const fixedAssetPageSlice = getPageSlice<FixedAssetResponse>("fixedAssetPage");

const { request, success, reject } = fixedAssetPageSlice.actions;

const pageActionTypes: PageSliceActionType<FixedAssetResponse> = {
  request,
  success,
  reject,
};

export const fixedAssetPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, fixedAssetUrl, pageActionTypes);

export const { reset: fixedAssetPageReset, create: fixedAssetAddOneToList, update: fixedAssetUpdateOneInList } = fixedAssetPageSlice.actions;
export default fixedAssetPageSlice.reducer;