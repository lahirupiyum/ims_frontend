import { VendorRequest, VendorResponse } from "../../../types/Vendor";
import { vendorUrl } from "../../../utils/url-properties/urls/vendor";
import globalCreateAction from "../../actions/globalCreateAction";
import CreateSliceActionType from "../../types/CreateActionType";
import getCreateSlice from "../config/globalCreateSlice";
import { vendorAddOneToList } from "./page";

const vendorCreateSlice = getCreateSlice<VendorResponse>("vendorCreate");

const { request, success, reject } = vendorCreateSlice.actions;

const createActionTypes: CreateSliceActionType<VendorResponse> = {
  request,
  success,
  reject,
  addOnetoList: vendorAddOneToList,
};

export const vendorCreateAction = (data: VendorRequest) =>
  globalCreateAction<VendorRequest, VendorResponse>(
    data,
    vendorUrl,
    createActionTypes
  );

export const { reset: vendorCreateReset } = vendorCreateSlice.actions;
export default vendorCreateSlice.reducer;