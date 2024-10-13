import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationType = {
  id: number;
  type: "success" | "error";
  message: string;
};

type NotificationStateType = {
  notificationList: NotificationType[];
};

const initialState: NotificationStateType = {
  notificationList: [],
};

const notificationSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    addOne: (
      state,
      action: PayloadAction<{ type: "success" | "error"; message: string }>
    ) => {
      const id = state.notificationList.length;
      state.notificationList.push({ id, ...action.payload });
    },
    removeOne: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const filteredSnackBarList = [...state.notificationList].filter(
        (snackbar) => snackbar.id !== id
      );
      state.notificationList = filteredSnackBarList;
    },

    clear: (state) => {
      state.notificationList = [];
    },
  },
});

export const {
  addOne: addOneNotification,
  removeOne: removeOneNotification,
  clear: clearNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
