
import { FixedAssetResponse } from "../../../../types/Inventory/asset/FixedAssets";
import { fixedAssetWithIdUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { fixedAssetPageAction } from "./page";
const fixedAssetDeleteSlice =
  getDeleteSlice<FixedAssetResponse>("fixedAssetDelete");

const { request, success, reject } = fixedAssetDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<FixedAssetResponse> = {
  request,
  success,
  reject,
};

export const fixedAssetDeleteAction = (id: number) =>
  globalDeleteAction<FixedAssetResponse>(
    fixedAssetWithIdUrl(id),
    deleteActionTypes,
    fixedAssetPageAction
  );

export const { reset: fixedAssetDeleteReset } = fixedAssetDeleteSlice.actions;
export default fixedAssetDeleteSlice.reducer;
