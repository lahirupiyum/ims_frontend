import { LastMileProvider } from "../../../../../types/customer/LastMileConnection";
import { lastMileProviderListUrl } from "../../../../../utils/url-properties/urls/customer/lastmile";
import globalListAction from "../../../../actions/globalListAction";
import ListSliceActionType from "../../../../types/ListActionType";
import getListSlice from "../../../config/globalListSlice";

const lastMileProviderListSlice = getListSlice<LastMileProvider>(
  "lastMileProviderList"
);

const { request, success, reject } = lastMileProviderListSlice.actions;

const listActionTypes: ListSliceActionType<LastMileProvider> = {
  request,
  success,
  reject,
};

export const lastMileProviderListAction = () =>
  globalListAction(lastMileProviderListUrl, listActionTypes);

export const { reset: lastMileProviderListReset } =
  lastMileProviderListSlice.actions;

export default lastMileProviderListSlice.reducer;
