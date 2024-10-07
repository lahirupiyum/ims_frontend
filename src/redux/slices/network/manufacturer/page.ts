import { networkDeviceManufacturerUrl } from "../../../../utils/url-properties/urls/network";
import globalPageAction, {
  PageActionInput,
} from "../../../actions/globalPageAction";
import getPageSlice from "../../config/globalPageSlice";

const manufacturerPageSlice = getPageSlice("manufacturerPage");

const { request, success, reject } = manufacturerPageSlice.actions;

export const manufacturerPageAction = (page: number, pageSize: number) => {
  const pageActionInput: PageActionInput = {
    url: networkDeviceManufacturerUrl,
    page,
    pageSize,
    request,
    success,
    reject,
  };

  return globalPageAction(pageActionInput);
};

export const { reset: manufacturerPageReset } = manufacturerPageSlice.actions;
export default manufacturerPageSlice.reducer;
