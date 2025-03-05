import { CusRouterRequest, CusRouterResponse } from "../../../../types/customer/CusRouter";
import { cusRouterwithIdUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";

const cusRouterUpdateSlice = getUpdateSlice<CusRouterResponse>("cusRouterUpdate");

const { request, success, reject } = cusRouterUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<CusRouterResponse> = {
    request,
    success,
    reject,
};

export const cusRouterUpdateAction = (id: number, data: CusRouterRequest) =>
    globalUpdateAction<CusRouterRequest, CusRouterResponse>(
        0,
        data,
        cusRouterwithIdUrl(id),
        updateActionTypes
    );

export const { reset: cusRouterUpdateReset } = cusRouterUpdateSlice.actions;
export default cusRouterUpdateSlice.reducer;