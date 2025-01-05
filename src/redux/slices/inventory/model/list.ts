import AssetType from "../../../../types/enums/AssetTypes";
import { Model } from "../../../../types/Inventory/Model";
import { fixedAssetModelListUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import { mobileAssetModelListUrl } from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import { networkAssetModelListUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const modelListSlice = getListSlice<Model>("modelList");

const { request, success, reject } = modelListSlice.actions;

const listActionTypes: ListSliceActionType<Model> = {
  request,
  success,
  reject,
};

export const modelListAction = (assetType: AssetType) => {
  const listAction = (url: string) =>
    globalListAction<Model>(url, listActionTypes);

  switch (assetType) {
    case AssetType.FIXED:
      return listAction(fixedAssetModelListUrl);
    case AssetType.MOBILE:
      return listAction(mobileAssetModelListUrl);
    case AssetType.NETWORK:
      return listAction(networkAssetModelListUrl);
  }
};

export const { reset: modelListReset } = modelListSlice.actions;
export default modelListSlice.reducer;
