import { CustomerResponse } from "../../../../types/customer/Customer";
import {
  customerListUrl,
  customerSearchUrl,
} from "../../../../utils/url-properties/urls/customer/customer";
import globalListAction from "../../../actions/globalListAction";
import globalSearchAction from "../../../actions/globalSearchAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const customerListSlice = getListSlice<CustomerResponse>("customerList");

const { request, success, reject } = customerListSlice.actions;

const listActionTypes: ListSliceActionType<CustomerResponse> = {
  request,
  success,
  reject,
};

export const customerListAction = () =>
  globalListAction(customerListUrl, listActionTypes);

export const customerSearchAction = (name: string) =>
  globalSearchAction(name, customerSearchUrl, listActionTypes);

export const { reset: customerListReset } = customerListSlice.actions;
export default customerListSlice.reducer;
