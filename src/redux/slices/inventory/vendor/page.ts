import { VendorResponse } from "../../../../types/Inventory/Vendor";
import {
  vendorSearchUrl,
  vendorUrl,
} from "../../../../utils/url-properties/urls/inventory/vendor";
import globalPageAction from "../../../actions/globalPageAction";
import globalSearchPageAction from "../../../actions/globalSearchPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import SearchPageSliceActionType from "../../../types/SearchActionType";
import getPageSlice from "../../config/globalPageSlice";

const vendorPageSlice = getPageSlice<VendorResponse>("vendorPage");

const { request, success, reject, searchSuccess, searchRequest } =
  vendorPageSlice.actions;

const pageActionTypes: PageSliceActionType<VendorResponse> = {
  request,
  success,
  reject,
};

const searchActionTypes: SearchPageSliceActionType<VendorResponse> = {
  request: searchRequest,
  success: searchSuccess,
  reject,
};

export const vendorPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, vendorUrl, pageActionTypes);

export const vendorSearchPageAction = (key: string) =>
  globalSearchPageAction(key, vendorSearchUrl, searchActionTypes);

export const {
  reset: vendorPageReset,
  create: vendorAddOneToList,
  update: vendorUpdateOneInList,
} = vendorPageSlice.actions;
export default vendorPageSlice.reducer;
