import AssetType from "../../../../types/enums/AssetTypes";
import { Type } from "../../../../types/Inventory/Type";
import { fixedAssetTypeListUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import { mobileAssetTypeListUrl } from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import { networkAssetTypeListUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const typeListSlice = getListSlice<Type>("typeList");

const { request, success, reject } = typeListSlice.actions;

const listActionTypes: ListSliceActionType<Type> = {
  request,
  success,
  reject,
};

export const typeListAction = (assetType: AssetType) => {
  const listAction = (url: string) =>
    globalListAction<Type>(url, listActionTypes);

  switch (assetType) {
    case AssetType.FIXED:
      return listAction(fixedAssetTypeListUrl);
    case AssetType.MOBILE:
      return listAction(mobileAssetTypeListUrl);
    case AssetType.NETWORK:
      return listAction(networkAssetTypeListUrl);
  }
};

export const { reset: typeListReset } = typeListSlice.actions;
export default typeListSlice.reducer;
