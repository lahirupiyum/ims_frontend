import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { UpdateStateType } from "../slices/config/globalPageSlice";

type UpdateSliceActionType<T> = {
  request: ActionCreatorWithPayload<void, `${string}/request`>;
  success: ActionCreatorWithPayload<T, `${string}/success`>;
  reject: ActionCreatorWithPayload<string, `${string}/reject`>;
  updateOneInList?: ActionCreatorWithPayload<
    UpdateStateType<T>,
    `${string}/update`
  >; // this one should get from the page slice
};

export default UpdateSliceActionType;
