import { PEConnectionRequset, PEConnectionResponse } from "../../../../types/customer/PERouter";
import { peRouterUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";

const peConnectionCreateSlice =
  getCreateSlice<PEConnectionResponse>("peConnectionCreate");

const { request, success, reject } = peConnectionCreateSlice.actions;

const createActionTypes: CreateSliceActionType<PEConnectionResponse> = {
  request,
  success,
  reject,
  addOnetoList: null,
};

export const peConnectionCreateAction = (data: PEConnectionRequset) =>
  globalCreateAction<PEConnectionRequset, PEConnectionResponse>(data, peRouterUrl, createActionTypes);

export const { reset: peConnectionCreateReset } =
  peConnectionCreateSlice.actions;
export default peConnectionCreateSlice.reducer;
