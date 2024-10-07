import { networkDeviceUrl } from "../../../../utils/url-properties/urls/network";
import getCreateSlice from "../../config/globalCreateSlice";
import NetworkDevice from "./typeConfig";

const deviceCreateSlice = getCreateSlice<NetworkDevice>(
  "networkDeviceCreate",
  networkDeviceUrl
);

export const { create: createDevice, reset: resetDevice } =
  deviceCreateSlice.actions;
export default deviceCreateSlice.reducer;