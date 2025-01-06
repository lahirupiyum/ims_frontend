import AssetType from "../../../../types/enums/AssetTypes";
import { Status } from "../../../../types/Inventory/Status";
import { fixedAssetStatusListUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import { mobileAssetStatusListUrl } from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import { networkAssetStatusListUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const statusListSlice = getListSlice<Status>("statusList");

const { request, success, reject } = statusListSlice.actions;

const listActionTypes: ListSliceActionType<Status> = {
  request,
  success,
  reject,
};

export const statusListAction = (assetType: AssetType) => {
  const listAction = (url: string) =>
    globalListAction<Status>(url, listActionTypes);

  switch (assetType) {
    case AssetType.FIXED:
      return listAction(fixedAssetStatusListUrl);
    case AssetType.MOBILE:
      return listAction(mobileAssetStatusListUrl);
    case AssetType.NETWORK:
      return listAction(networkAssetStatusListUrl);
  }
};

export const { reset: statusListReset } = statusListSlice.actions;
export default statusListSlice.reducer;
