import { Manufacturer } from "../../../../types/Inventory/Manufacturer";
import { manufacturerUrl } from "../../../../utils/url-properties/urls/inventory/manufacturer";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const manufacturerPageSlice = getPageSlice<Manufacturer>("manufacturerPage");

const { request, success, reject } = manufacturerPageSlice.actions;

const pageActionTypes: PageSliceActionType<Manufacturer> = {
  request,
  success,
  reject,
};

export const manufacturerpageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, manufacturerUrl, pageActionTypes);

export const {
  reset: manfuacturerPageReset,
  create: manufacturerAddOneToList,
  update: manufacturerUpdateOneInList,
} = manufacturerPageSlice.actions;
export default manufacturerPageSlice.reducer;
