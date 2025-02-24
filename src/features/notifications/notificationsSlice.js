import { createSlice } from '@reduxjs/toolkit';
import { getNotificationsThunk, deleteCurrentNotificationThunk, patchCurrentNotificationThunk } from './notificationsThunk';

const initialState = {
  notificationsList: [],
  unseenNotificationsCount: 0
};

const notificationsSlice = createSlice({
  name: 'notificationst',
  initialState,
  reducers: {
    setNotificationsList(state, action) {
      state.notificationsList = action.payload;
    },
    setUnseenNotificationsCount(state, action) {
      state.unseenNotificationsCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsThunk.fulfilled, (state, action) => {
        state.notificationsList = action.payload;

        let newNotifications = 0;
        state.notificationsList.forEach((notification) => {
          if (notification.unread) {
            newNotifications++;
          }
        });

        state.unseenNotificationsCount = newNotifications;
      })
      .addCase(getNotificationsThunk.rejected, (state, action) => {
        console.error('Error fetching notifications list:', action.payload);
      })
      .addCase(deleteCurrentNotificationThunk.fulfilled, (state, action) => {
        state.notificationsList = state.notificationsList.filter(notification => notification.uuid !== action.meta.arg);
      })
      .addCase(deleteCurrentNotificationThunk.rejected, (state, action) => {
        console.error('Error fetching files list:', action.payload);
      })
      .addCase(patchCurrentNotificationThunk.fulfilled, (state, action) => {
        const updatedNotification = action.payload;
        const index = state.notificationsList.findIndex(
          (notification) => notification.uuid === updatedNotification.uuid
        );

        if (index !== -1) {
          state.notificationsList[index] = updatedNotification;
        }
      })
      .addCase(patchCurrentNotificationThunk.rejected, (state, action) => {
        console.error('Error updating notification:', action.payload);
      });
  },
});

export const { setNotificationsList, setUnseenNotificationsCount } = notificationsSlice.actions;
export default notificationsSlice.reducer;
