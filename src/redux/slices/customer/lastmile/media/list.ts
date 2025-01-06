import { LastMileMedia } from "../../../../../types/customer/LastMileConnection";
import { lastMileMediaListUrl } from "../../../../../utils/url-properties/urls/customer/lastmile";
import globalListAction from "../../../../actions/globalListAction";
import ListSliceActionType from "../../../../types/ListActionType";
import getListSlice from "../../../config/globalListSlice";

const lastMileMediaListSlice = getListSlice<LastMileMedia>("lastMileMediaList");
const { request, success, reject } = lastMileMediaListSlice.actions;

const listActionTypes: ListSliceActionType<LastMileMedia> = {
  request,
  success,
  reject,
};

export const lastMileMediaListAction = () =>
  globalListAction(lastMileMediaListUrl, listActionTypes);

export const { reset: lastMileMediaListReset } = lastMileMediaListSlice.actions;

export default lastMileMediaListSlice.reducer;
