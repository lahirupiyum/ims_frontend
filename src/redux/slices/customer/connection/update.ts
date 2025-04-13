import {
  ConnectionRequest,
  ConnectionResponse,
} from "../../../../types/customer/Connection";
import { connectionWithIdUrl } from "../../../../utils/url-properties/urls/customer/service";
import globalUpdateAction from "../../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../../types/UpdateActionType";
import getUpdateSlice from "../../config/globalUpdateSlice";

const connectionUpdateSlice =
  getUpdateSlice<ConnectionResponse>("connectionUpdate");

const { request, success, reject } = connectionUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<ConnectionResponse> = {
  request,
  success,
  reject,
};

export const connectionUpdateAction = (id: number, data: ConnectionRequest) =>
  globalUpdateAction<ConnectionRequest, ConnectionResponse>(
    0,
    data,
    connectionWithIdUrl(id),
    updateActionTypes
  );

export const { reset: connectionUpdateReset } = connectionUpdateSlice.actions;
export default connectionUpdateSlice.reducer;
