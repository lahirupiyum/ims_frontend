import { ConnectionResponse } from "../../../../types/customer/Connection";
import { connectionActivateWithIdUrl, connectionWithIdUrl } from "../../../../utils/url-properties/urls/customer/service";
import globalDeleteAction from "../../../actions/globalDeleteAction";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import DeleteSliceActionType from "../../../types/DeleteActionType";
import getDeleteSlice from "../../config/globalDeleteSlice";

const connectionTerminateAndActivateSlice = getDeleteSlice<ConnectionResponse>("connectionTerminate");

const {
    request,
    success,
    reject
} = connectionTerminateAndActivateSlice.actions;

const deleteActionTypes: DeleteSliceActionType<ConnectionResponse> = {
    reject,
    request,
    success
}

export const terminateConnectionAction = (id: number) => globalDeleteAction(connectionWithIdUrl(id), deleteActionTypes);
export const activateConnectionAction = (id: number) => globalUpdateAction(0, null, connectionActivateWithIdUrl(id),deleteActionTypes);

export const { reset: connectionTerminateAndActivateReset } = connectionTerminateAndActivateSlice.actions;
export default connectionTerminateAndActivateSlice.reducer;