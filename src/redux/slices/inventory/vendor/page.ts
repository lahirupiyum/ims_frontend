import { VendorResponse } from "../../../types/Vendor";
import { vendorUrl } from "../../../../utils/url-properties/urls/inventory/vendor";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const vendorPageSlice = getPageSlice<VendorResponse>("vendorPage");

const { request, success, reject } = vendorPageSlice.actions;

const pageActionTypes: PageSliceActionType<VendorResponse> = {
  request,
  success,
  reject,
};

export const vendorPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, vendorUrl, pageActionTypes);

export const { reset: vendorPageReset, create: vendorAddOneToList, update: vendorUpdateOneInList } = vendorPageSlice.actions;
export default vendorPageSlice.reducer;