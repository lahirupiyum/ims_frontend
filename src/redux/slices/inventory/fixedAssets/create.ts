import {
  FixedAssetRequest,
  FixedAssetResponse,
} from "../../../../types/Inventory/asset/FixedAssets";
import { fixedAssetUrl } from "../../../../utils/url-properties/urls/inventory/fixedAssests";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { fixedAssetAddOneToList } from "./page";

const fixedAssetCreateSlice =
  getCreateSlice<FixedAssetResponse>("fixedAssetCreate");

const { request, success, reject } = fixedAssetCreateSlice.actions;

const actionTypes: CreateSliceActionType<FixedAssetResponse> = {
  request,
  success,
  reject,
  addOnetoList: fixedAssetAddOneToList,
};

export const fixedAssetCreateAction = (data: FixedAssetRequest) =>
  globalCreateAction<FixedAssetRequest, FixedAssetResponse>(
    data,
    fixedAssetUrl,
    actionTypes
  );

export const { reset: fixedAssetCreateReset } = fixedAssetCreateSlice.actions;
export default fixedAssetCreateSlice.reducer;
