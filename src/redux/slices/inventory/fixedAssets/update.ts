import { FixedAssetRequest, FixedAssetResponse } from "../../../../types/Inventory/asset/FixedAssets";
import { fixedAssetWithIdUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { fixedAssetUpdateOneInList } from "./page";

const fixedAssetUpdateSlice =
  getUpdateSlice<FixedAssetResponse>("fixedAssetUpdate");

const { request, success, reject } = fixedAssetUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<FixedAssetResponse> = {
  request,
  success,
  reject,
  updateOneInList: fixedAssetUpdateOneInList,
};

export const fixedAssetUpdateAction = (
  id: number,
  data: FixedAssetRequest,
  index: number
) =>
  globalUpdateAction<FixedAssetRequest, FixedAssetResponse>(
    index,
    data,
    fixedAssetWithIdUrl(id),
    updateActionTypes
  );

export const { reset: fixedAssetUpdateReset } = fixedAssetUpdateSlice.actions;
export default fixedAssetUpdateSlice.reducer;
