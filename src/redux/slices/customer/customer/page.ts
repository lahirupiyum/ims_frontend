import { CustomerResponse } from "../../../../types/customer/Customer";
import { customerUrl } from "../../../../utils/url-properties/urls/customer/customer";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const customerPageSlice = getPageSlice<CustomerResponse>("customerPage");

const { request, success, reject } = customerPageSlice.actions;

const pageActionTypes: PageSliceActionType<CustomerResponse> = {
  request,
  success,
  reject,
};

export const customerPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, customerUrl, pageActionTypes);

export const {
  reset: customerPageReset,
  create: customerAddOneToList,
  update: customerUpdateOneInList,
} = customerPageSlice.actions;
export default customerPageSlice.reducer;
