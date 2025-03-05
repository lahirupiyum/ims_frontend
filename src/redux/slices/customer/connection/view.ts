import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionResponse, FirewallCredentialsResponse } from '../../../../types/customer/Connection';
import { CusRouterResponse } from "../../../../types/customer/CusRouter";
import { LastMileConnectionResponse } from "../../../../types/customer/LastMileConnection";
import { PEConnectionResponse } from "../../../../types/customer/PERouter";

const initialState: { connection: ConnectionResponse | null } = {
  connection: null,
};

const connectionviewSlice = createSlice({
  name: "connectionView",
  initialState,
  reducers: {
    view: (state, action: PayloadAction<ConnectionResponse>) => {
      state.connection = action.payload as Draft<ConnectionResponse>;
    },
    updatePEConnectionView: (
      state,
      action: PayloadAction<PEConnectionResponse>
    ) => {
      if (!state.connection) return;
      state.connection.peRouter = action.payload;
    },
    updateLastMileConnectionView: (
      state,
      action: PayloadAction<LastMileConnectionResponse>
    ) => {
      if (!state.connection) return;
      state.connection.lastMileConnection = action.payload;
    },
    updateCuRouterView: (state, action: PayloadAction<CusRouterResponse>) => {
      if (!state.connection) return;
      state.connection.cusRouter = action.payload;
    },
    updateFirewallCredentialsView: (state, action: PayloadAction<FirewallCredentialsResponse>) => {
      if (!state.connection) return;
      state.connection.firewallCredentials = action.payload;
    },
    updateConnectionView: (state, action: PayloadAction<ConnectionResponse>) => {
        if (!state.connection) return;
        state.connection = action.payload;
    },
    reset: (state) => {
      state.connection = null;
    },
  },
});

export const {
  view: viewConnection,
  reset: resetConnection,
  updatePEConnectionView,
  updateLastMileConnectionView,
  updateCuRouterView,
  updateFirewallCredentialsView,
  updateConnectionView
} = connectionviewSlice.actions;
export default connectionviewSlice.reducer;
