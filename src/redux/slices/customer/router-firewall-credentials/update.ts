import { FirewallCredentialsRequest, FirewallCredentialsResponse } from "../../../../types/customer/Connection";
import { firewallCredentialsWithIdUrl } from "../../../../utils/url-properties/urls/customer/router";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";

const fcUpdateSlice = getUpdateSlice<FirewallCredentialsResponse>("firewallCredentialsUpdate");

const { 
    request,
    success,
    reject
} = fcUpdateSlice.actions

const updateActionTypes: UpdateSliceActionType<FirewallCredentialsResponse> = {
    request, success, reject
}

export const fcUpdateAction = (id: number, data: FirewallCredentialsRequest) => globalUpdateAction<FirewallCredentialsRequest, FirewallCredentialsResponse>(0, data, firewallCredentialsWithIdUrl(id), updateActionTypes);

export const { reset: fcUpdateReset} = fcUpdateSlice.actions;
export default fcUpdateSlice.reducer;