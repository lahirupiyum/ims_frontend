import AssetType from "../../../../types/enums/AssetTypes";
import { Manufacturer } from "../../../../types/Inventory/Manufacturer";
import { fixedAssetManufacturerListUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import { mobileAssetManufacturerListUrl } from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import { networkAssetManufacturerListUrl } from "../../../../utils/url-properties/urls/inventory/networkAssets";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const manufacturerListSlice = getListSlice<Manufacturer>("manufacturerList");

const { request, success, reject } = manufacturerListSlice.actions;

const listActionTypes: ListSliceActionType<Manufacturer> = {
  request,
  success,
  reject,
};

export const manufacturerListAction = (assetType: AssetType) => {
  const listAction = (url: string) =>
    globalListAction<Manufacturer>(url, listActionTypes);

  switch (assetType) {
    case AssetType.FIXED:
      return listAction(fixedAssetManufacturerListUrl);
    case AssetType.MOBILE:
      return listAction(mobileAssetManufacturerListUrl);
    case AssetType.NETWORK:
      return listAction(networkAssetManufacturerListUrl);;
  }
};

export const { reset: manufacturerListReset } = manufacturerListSlice.actions;
export default manufacturerListSlice.reducer;
