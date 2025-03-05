import { ConnectionResponse } from "../../../../../types/customer/Connection";
import {
  illConnectionUrl,
  illSearchUrl,
} from "../../../../../utils/url-properties/urls/customer/service";
import globalPageAction from "../../../../actions/globalPageAction";
import globalSearchPageAction from "../../../../actions/globalSearchPageAction";
import PageSliceActionType from "../../../../types/PageActionType";
import SearchPageSliceActionType from "../../../../types/SearchActionType";
import getPageSlice from "../../../config/globalPageSlice";

const illConnectionPageSlice =
  getPageSlice<ConnectionResponse>("illConnectionPage");

const { request, success, reject, searchRequest, searchSuccess } =
  illConnectionPageSlice.actions;

const pageActionTypes: PageSliceActionType<ConnectionResponse> = {
  request,
  success,
  reject,
};

const searchActionTypes: SearchPageSliceActionType<ConnectionResponse> = {
  request: searchRequest,
  success: searchSuccess,
  reject,
};

export const illConnectionPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, illConnectionUrl, pageActionTypes);

export const illSearchAction = (key: string) =>
  globalSearchPageAction(key, illSearchUrl, searchActionTypes);

export const {
  reset: illConnectionPageReset,
  create: illConnectionAddOneToList,
  update: illConnectionUpdaetOneInList,
} = illConnectionPageSlice.actions;
export default illConnectionPageSlice.reducer;
