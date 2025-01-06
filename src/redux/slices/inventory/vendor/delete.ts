import { VendorResponse } from "../../../../types/Inventory/Vendor";
import { vendorWithIdUrl } from "../../../../utils/url-properties/urls/inventory/vendor";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";
import { vendorPageAction } from "./page";

const vendorDeleteSlice = getDeleteSlice<VendorResponse>("vendorDelete");

const { request, success, reject } = vendorDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<VendorResponse> = {
  request,
  success,
  reject,
};

export const vendorDeleteAction = (id: number) =>
  globalDeleteAction<VendorResponse>(
    vendorWithIdUrl(id),
    deleteActionTypes,
    vendorPageAction
  );

export const { reset: vendorDeleteReset } = vendorDeleteSlice.actions;
export default vendorDeleteSlice.reducer;
