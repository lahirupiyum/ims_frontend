import { networkDeviceUrl } from '../../../../utils/url-properties/urls/network';
import getPageSlice from "../../config/pageSlice";

const devicePageSlice = getPageSlice("networkDevicePage", networkDeviceUrl);

export const { fetchPage, reset } = devicePageSlice.actions;

export default devicePageSlice.reducer;
