import { FixedAssetResponse } from "../../../../types/Inventory/asset/FixedAssets";
import {
  fixedAssetSearchUrl,
  fixedAssetUrl,
} from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import globalPageAction from "../../../actions/globalPageAction";
import globalSearchPageAction from "../../../actions/globalSearchPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import SearchPageSliceActionType from "../../../types/SearchActionType";
import getPageSlice from "../../config/globalPageSlice";

const fixedAssetPageSlice = getPageSlice<FixedAssetResponse>("fixedAssetPage");

const { request, success, reject, searchRequest, searchSuccess } =
  fixedAssetPageSlice.actions;

const pageActionTypes: PageSliceActionType<FixedAssetResponse> = {
  request,
  success,
  reject,
};

const searchActionTypes: SearchPageSliceActionType<FixedAssetResponse> = {
  request: searchRequest,
  success: searchSuccess,
  reject,
};

export const fixedAssetPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, fixedAssetUrl, pageActionTypes);

export const fixedAssetSearchAction = (key: string) =>
  globalSearchPageAction(key, fixedAssetSearchUrl, searchActionTypes);

export const {
  reset: fixedAssetPageReset,
  create: fixedAssetAddOneToList,
  update: fixedAssetUpdateOneInList,
} = fixedAssetPageSlice.actions;
export default fixedAssetPageSlice.reducer;
