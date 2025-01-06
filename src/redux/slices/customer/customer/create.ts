import {
  CustomerRequest,
  CustomerResponse,
} from "../../../../types/customer/Customer";
import { customerUrl } from "../../../../utils/url-properties/urls/customer/customer";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";
import { customerAddOneToList } from "./page";

const customerCreateSlice = getCreateSlice<CustomerResponse>("customerCreate");

const { request, success, reject } = customerCreateSlice.actions;

const createActionTypes: CreateSliceActionType<CustomerResponse> = {
  request,
  success,
  reject,
  addOnetoList: customerAddOneToList,
};

export const customerCreateAction = (data: CustomerRequest) =>
  globalCreateAction<CustomerRequest, CustomerResponse>(
    data,
    customerUrl,
    createActionTypes
  );

export const { reset: customerCreateReset } = customerCreateSlice.actions;
export default customerCreateSlice.reducer;
