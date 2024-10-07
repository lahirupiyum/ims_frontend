import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

type SliceActionType <T> = {
    request: ActionCreatorWithPayload<void, `${string}/request`>
    success: ActionCreatorWithPayload<T, `${string}/success`>
    reject: ActionCreatorWithPayload<string, `${string}/reject`>
}

export default SliceActionType;