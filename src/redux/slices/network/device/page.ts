import { networkDeviceUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction, { PageActionInput } from "../../../actions/globalPageAction";
import getPageSlice from "../../config/globalPageSlice";

const devicePageSlice = getPageSlice("networkDevicePage");

const { request, success, reject } = devicePageSlice.actions;

export const devicePageAction = (page:number, pageSize:number) => {
    const pageActionInput: PageActionInput = {
        url: networkDeviceUrl,
        page,
        pageSize,
        request,
        success,
        reject
    }
    return globalPageAction(pageActionInput);
}

export const { reset: devicePageReset } = devicePageSlice.actions;
export default devicePageSlice.reducer;
