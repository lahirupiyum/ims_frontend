import {
  CusRouterRequest,
  CusRouterResponse,
} from "../../../../types/customer/CusRouter";
import { cusRouterUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";

const cusRouterCreateSlice =
  getCreateSlice<CusRouterResponse>("cusRouterCreate");

const { request, success, reject } = cusRouterCreateSlice.actions;

const createActionTypes: CreateSliceActionType<CusRouterResponse> = {
  request,
  success,
  reject,
  addOnetoList: null,
};

export const cusRouterCreateAction = (data: CusRouterRequest) =>
  globalCreateAction<CusRouterRequest, CusRouterResponse>(
    data,
    cusRouterUrl,
    createActionTypes
  );

export const { reset: cusRouterCreateReset } = cusRouterCreateSlice.actions;
export default cusRouterCreateSlice.reducer;
