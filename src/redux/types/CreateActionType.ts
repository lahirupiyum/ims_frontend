import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

type CreateSliceActionType<T> = {
    request: ActionCreatorWithPayload<void, `${string}/request`>
    success: ActionCreatorWithPayload<T, `${string}/success`>
    reject: ActionCreatorWithPayload<string, `${string}/reject`>
    addOnetoList: ActionCreatorWithPayload<T, `${string}/create`> | null  // this one should get from the page slice
}

export default CreateSliceActionType;