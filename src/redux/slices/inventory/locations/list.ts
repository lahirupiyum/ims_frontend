import { Location } from "../../../../types/Inventory/Location";
import { locationListUrl } from "../../../../utils/url-properties/urls/inventory/location";
import globalListAction from "../../../actions/globalListAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const locationListSlice = getListSlice<Location>("locationList");

const { request, success, reject } = locationListSlice.actions;

const listActionTypes: ListSliceActionType<Location> = {
  request,
  success,
  reject,
};

export const locationListAction = () =>
  globalListAction<Location>(locationListUrl, listActionTypes);

export const { reset: locationListReset } = locationListSlice.actions;

export default locationListSlice.reducer;
