import { VendorResponse } from "../../../types/Vendor";
import { vendorListUrl } from "../../../../utils/url-properties/urls/inventory/vendor";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const vendorListSlice = getListSlice<VendorResponse>("vendorList");

const { request, success, reject } = vendorListSlice.actions;

const listActionTypes: ListSliceActionType<VendorResponse> = {
    request,
    success,
    reject
};

export const vendorListAction = () => globalListAction<VendorResponse>(vendorListUrl, listActionTypes);

export const { reset: vendorListReset } = vendorListSlice.actions;
export default vendorListSlice.reducer;