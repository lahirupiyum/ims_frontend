import { CustomerResponse } from "../../../../types/customer/Customer";
import { customerWithIdUrl } from "../../../../utils/url-properties/urls/customer/customer";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { customerPageAction } from "./page";

const customerDeleteSlice = getDeleteSlice<CustomerResponse>("customerDelete");

const { request, success, reject } = customerDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<CustomerResponse> = {
  request,
  success,
  reject,
};

export const customerDeleteAction = (id: number) =>
  globalDeleteAction<CustomerResponse>(
    customerWithIdUrl(id),
    deleteActionTypes,
    customerPageAction
  );

export const { reset: customerDeleteReset } = customerDeleteSlice.actions;
export default customerDeleteSlice.reducer;
