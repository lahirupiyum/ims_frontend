import { PERouterResponse } from "../../../../types/customer/PERouter";
import { peRouterUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const peRouterPageSlice = getPageSlice<PERouterResponse>("peRouterResponse");

const { request, success, reject } = peRouterPageSlice.actions;

const pageActionTypes: PageSliceActionType<PERouterResponse> = {
  request,
  success,
  reject,
};

export const peRouterPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, peRouterUrl, pageActionTypes);

export const {
  reset: peRouterPageReset,
  create: peRouterAddOneToList,
  update: peRouterUpdateOneInList,
} = peRouterPageSlice.actions;
export default peRouterPageSlice.reducer;
