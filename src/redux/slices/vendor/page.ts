import { VendorResponse } from "../../../types/Vendor";
import { vendorUrl } from "../../../utils/url-properties/urls/vendor";
import globalPageAction, { PageReponse } from "../../actions/globalPageAction";
import SliceActionType from "../../actions/sliceActionType";
import getPageSlice from "../config/globalPageSlice";

const vendorPageSlice = getPageSlice<VendorResponse>("vendorPage");

const { request, success, reject } = vendorPageSlice.actions;

const pageActionTypes: SliceActionType<PageReponse<VendorResponse>> = {
  request,
  success,
  reject,
};

export const vendorPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, vendorUrl, pageActionTypes);

export const { reset: vendorPageReset } = vendorPageSlice.actions;
export default vendorPageSlice.reducer;