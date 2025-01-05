import { VendorResponse } from "../../../../types/Inventory/Vendor";
import {
  vendorListUrl,
  vendorSearchUrl,
} from "../../../../utils/url-properties/urls/inventory/vendor";
import globalListAction from "../../../actions/globalListAction";
import globalSearchAction from "../../../actions/globalSearchAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const vendorListSlice = getListSlice<VendorResponse>("vendorList");

const { request, success, reject } = vendorListSlice.actions;

const listActionTypes: ListSliceActionType<VendorResponse> = {
  request,
  success,
  reject,
};

export const vendorListAction = () =>
  globalListAction<VendorResponse>(vendorListUrl, listActionTypes);
export const vendorSearchAction = (name: string) =>
  globalSearchAction<VendorResponse>(name, vendorSearchUrl, listActionTypes);

export const { reset: vendorListReset } = vendorListSlice.actions;
export default vendorListSlice.reducer;
