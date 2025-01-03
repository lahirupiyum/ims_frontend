import { NetworkAssetResponse } from "../../../../types/Inventory/asset/NetworkAssets";
import { networkAssetUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const networkAssetPageSlice = getPageSlice<NetworkAssetResponse>("networkAssetPage");

const { request, success, reject } = networkAssetPageSlice.actions;

const pageActionTypes: PageSliceActionType<NetworkAssetResponse> = {
  request,
  success,
  reject,
};

export const networkAssetPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, networkAssetUrl, pageActionTypes);

export const { reset: networkAssetPageReset, create: networkAssetAddOneToList, update: networkAssetUpdateOneInList } = networkAssetPageSlice.actions;
export default networkAssetPageSlice.reducer;