import { MobileAssetResponse } from "../../../../types/Inventory/asset/ModileAssets";
import {
  mobileAssetSearchUrl,
  mobileAssetUrl,
} from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import globalPageAction from "../../../actions/globalPageAction";
import globalSearchPageAction from "../../../actions/globalSearchPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import SearchPageSliceActionType from "../../../types/SearchActionType";
import getPageSlice from "../../config/globalPageSlice";

const mobileAssetPageSlice =
  getPageSlice<MobileAssetResponse>("mobileAssetPage");

const { request, success, reject, searchSuccess, searchRequest } =
  mobileAssetPageSlice.actions;

const pageActionTypes: PageSliceActionType<MobileAssetResponse> = {
  request,
  success,
  reject,
};

const searchActionTypes: SearchPageSliceActionType<MobileAssetResponse> = {
  request: searchRequest,
  success: searchSuccess,
  reject,
};

export const mobileAssetPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, mobileAssetUrl, pageActionTypes);

export const mobileAssetSearchAction = (key: string) =>
  globalSearchPageAction(key, mobileAssetSearchUrl, searchActionTypes);

export const {
  reset: mobileAssetPageReset,
  create: mobilekAssetAddOneToList,
  update: mobileAssetUpdateOneInList,
} = mobileAssetPageSlice.actions;
export default mobileAssetPageSlice.reducer;
