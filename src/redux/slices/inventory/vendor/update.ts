import { VendorRequest, VendorResponse } from "../../../types/Vendor";
import { vendorWithIdUrl } from "../../../../utils/url-properties/urls/inventory/vendor";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";
import { vendorUpdateOneInList } from "./page";

const vendorUpdateSlice = getUpdateSlice<VendorResponse>("vendorUpdate");
const { request, success, reject } = vendorUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<VendorResponse> = {
  request,
  success,
  reject,
  updateOneInList: vendorUpdateOneInList,
};

export const vendorUpdateAction = (
  id: number,
  data: VendorRequest,
  index: number
) =>
  globalUpdateAction<VendorRequest, VendorResponse>(
    index,
    data,
    vendorWithIdUrl(id),
    updateActionTypes
  );

  export const { reset: vendorUpdateReset } = vendorUpdateSlice.actions;
  export default vendorUpdateSlice.reducer;