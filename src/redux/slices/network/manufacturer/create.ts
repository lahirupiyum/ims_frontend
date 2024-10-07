import { networkDeviceManufacturerUrl } from "../../../../utils/url-properties/urls/network";
import getCreateSlice from "../../config/globalCreateSlice";
import NetworkDeviceManufacturer from "./typeConfig";

const manufacturerCreateSlice = getCreateSlice<NetworkDeviceManufacturer>("networkDeviceManufacturer", networkDeviceManufacturerUrl)

export const { create: manufacturerCreate, reset: manufacturerCreateReset } = manufacturerCreateSlice.actions;
export default manufacturerCreateSlice.reducer;