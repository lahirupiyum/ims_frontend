import {
  CustomerRequest,
  CustomerResponse,
} from "../../../../types/customer/Customer";
import { customerWithIdUrl } from "../../../../utils/url-properties/urls/customer/customer";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { customerUpdateOneInList } from "./page";

const customerUpdateSlice = getUpdateSlice<CustomerResponse>("customerUpdate");

const { request, success, reject } = customerUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<CustomerResponse> = {
  request,
  success,
  reject,
  updateOneInList: customerUpdateOneInList,
};

export const customerUpdateAction = (
  id: number,
  data: CustomerRequest,
  index: number
) =>
  globalUpdateAction<CustomerRequest, CustomerResponse>(
    index,
    data,
    customerWithIdUrl(id),
    updateActionTypes
  );

export const { reset: customerUpdateReset } = customerUpdateSlice.actions;
export default customerUpdateSlice.reducer;
