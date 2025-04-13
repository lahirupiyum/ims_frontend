import { LastMileConnectionRequest, LastMileConnectionResponse } from "../../../../../types/customer/LastMileConnection";
import { lastMileConnectionWithIdUrl } from "../../../../../utils/url-properties/urls/customer/lastmile";
import globalUpdateAction from "../../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../../types/UpdateActionType";
import getUpdateSlice from "../../../config/globalUpdateSlice";

const lastMileConnectionUpdateSlice = getUpdateSlice<LastMileConnectionResponse>("lastMileConnectionUpdate");

const { request, success, reject } = lastMileConnectionUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<LastMileConnectionResponse> = {
    request,
    success,
    reject,
};

export const lastMileConnectionUpdateAction = (id: number, data: LastMileConnectionRequest) =>
    globalUpdateAction<LastMileConnectionRequest, LastMileConnectionResponse>(
        0,
        data,
        lastMileConnectionWithIdUrl(id),
        updateActionTypes,
    );

export const { reset: lastMileConnectionUpdateReset } = lastMileConnectionUpdateSlice.actions;
export default lastMileConnectionUpdateSlice.reducer;