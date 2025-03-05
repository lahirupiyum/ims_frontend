import { CustomerResponse } from "../../../../types/customer/Customer";
import {
  customerSearchUrl,
  customerUrl,
} from "../../../../utils/url-properties/urls/customer/customer";
import globalPageAction from "../../../actions/globalPageAction";
import globalSearchPageAction from "../../../actions/globalSearchPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import SearchPageSliceActionType from "../../../types/SearchActionType";
import getPageSlice from "../../config/globalPageSlice";

const customerPageSlice = getPageSlice<CustomerResponse>("customerPage");

const { request, success, reject, searchRequest, searchSuccess } =
  customerPageSlice.actions;

const pageActionTypes: PageSliceActionType<CustomerResponse> = {
  request,
  success,
  reject,
};

const searchActionTypes: SearchPageSliceActionType<CustomerResponse> = {
  request: searchRequest,
  success: searchSuccess,
  reject,
};

export const customerPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, customerUrl, pageActionTypes);

export const customerSearchPageAction = (key: string) =>
  globalSearchPageAction(key, customerSearchUrl, searchActionTypes);

export const {
  reset: customerPageReset,
  create: customerAddOneToList,
  update: customerUpdateOneInList,
} = customerPageSlice.actions;
export default customerPageSlice.reducer;
