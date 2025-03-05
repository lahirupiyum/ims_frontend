import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import { networkAssetSearchUrl, networkAssetUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalPageAction from "../../../actions/globalPageAction";
import globalSearchPageAction from "../../../actions/globalSearchPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import SearchPageSliceActionType from "../../../types/SearchActionType";
import getPageSlice from "../../config/globalPageSlice";

const networkAssetPageSlice = getPageSlice<NetworkAssetResponse>("networkAssetPage");

const { request, success, reject, searchRequest, searchSuccess } = networkAssetPageSlice.actions;

const pageActionTypes: PageSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
};

const searchActionTypes: SearchPageSliceActionType<NetworkAssetResponse> = {
  request: searchRequest,
  success: searchSuccess,
  reject
}

export const networkAssetPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkAssetUrl, pageActionTypes);

export const networkAssetSearchAction = (key: string) => 
  globalSearchPageAction(key, networkAssetSearchUrl, searchActionTypes);

export const { reset: networkAssetPageReset, create: networkAssetAddOneToList, update: networkAssetUpdateOneInList } = networkAssetPageSlice.actions;
export default networkAssetPageSlice.reducer;