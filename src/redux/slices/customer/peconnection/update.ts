import { PEConnectionRequest, PEConnectionResponse } from "../../../../types/customer/PERouter";
import { peRouterWithIdUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";

const peConnectionUpdateSlice = getUpdateSlice<PEConnectionResponse>("peConnectionUpdate");

const { request, success, reject } = peConnectionUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<PEConnectionResponse> = {
    request,
    success,
    reject,
};

export const peConnectionUpdateAction = (id: number, data: PEConnectionRequest) =>
    globalUpdateAction<PEConnectionRequest, PEConnectionResponse>(
        0,
        data,
        peRouterWithIdUrl(id),
        updateActionTypes
    );

export const { reset: peConnectionUpdateReset } = peConnectionUpdateSlice.actions;
export default peConnectionUpdateSlice.reducer;