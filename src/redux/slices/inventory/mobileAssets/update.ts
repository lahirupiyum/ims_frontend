import {
  MobileAssetRequest,
  MobileAssetResponse,
} from "../../../../types/Inventory/asset/ModileAssets";
import { mobileAssetWithIdUrl } from "../../../../utils/url-properties/urls/inventory/mobileAssets";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { mobileAssetUpdateOneInList } from "./page";

const mobileAssetUpdateSlice =
  getUpdateSlice<MobileAssetResponse>("mobileAssetUpdate");

const { request, success, reject } = mobileAssetUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<MobileAssetResponse> = {
  request,
  success,
  reject,
  updateOneInList: mobileAssetUpdateOneInList,
};

export const mobileAssetUpdateAction = (
  id: number,
  data: MobileAssetRequest,
  index: number
) =>
  globalUpdateAction<MobileAssetRequest, MobileAssetResponse>(
    index,
    data,
    mobileAssetWithIdUrl(id),
    updateActionTypes
  );

export const { reset: mobileAssetUpdateReset } = mobileAssetUpdateSlice.actions;
export default mobileAssetUpdateSlice.reducer;
