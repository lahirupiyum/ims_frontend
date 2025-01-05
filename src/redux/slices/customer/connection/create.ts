import {
  ConnectionRequest,
  ConnectionResponse,
} from "../../../../types/customer/Connection";
import { connectionUrl } from "../../../../utils/url-properties/urls/customer/service";
import globalCreateAction from "../../../actions/globalCreateAction";
import CreateSliceActionType from "../../../types/CreateActionType";
import getCreateSlice from "../../config/globalCreateSlice";

const connectionCreateSlice = getCreateSlice<ConnectionResponse>(
  "connectionCreateSlice"
);

const { request, success, reject } = connectionCreateSlice.actions;

const createActionTypes: CreateSliceActionType<ConnectionResponse> = {
  request,
  success,
  reject,
  addOnetoList: null,
};

export const connectionCreateAction = (data: ConnectionRequest) =>
  globalCreateAction<ConnectionRequest, ConnectionResponse>(
    data,
    connectionUrl,
    createActionTypes
  );

export const { reset: connectionCreateReset } = connectionCreateSlice.actions;
export default connectionCreateSlice.reducer;
