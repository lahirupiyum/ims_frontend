import { CusRouterRespone } from "../../../../types/customer/CusRouter";
import { cusRouterUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalPageAction from "../../../actions/globalPageAction";
import PageSliceActionType from "../../../types/PageActionType";
import getPageSlice from "../../config/globalPageSlice";

const cusRouterPageSlice = getPageSlice<CusRouterRespone>("cusRouterPage");
const { request, success, reject } = cusRouterPageSlice.actions;

const pageActionTypes: PageSliceActionType<CusRouterRespone> = {
  request,
  success,
  reject,
};

export const cusRouterPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, cusRouterUrl, pageActionTypes);

export const {
  reset: cusRouterPageReset,
  create: cusRouterAddOneToList,
  update: cusRouterUpdateOneInList,
} = cusRouterPageSlice.actions;

export default cusRouterPageSlice.reducer;
