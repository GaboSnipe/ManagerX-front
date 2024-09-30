import { createAsyncThunk } from '@reduxjs/toolkit';
import NotificationsService from '../../services/NotificationsService';

export const getNotificationsThunk  = createAsyncThunk(
  'notifications/list/',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const user_id = state.auth.userInfo.id; 
      const response = await NotificationsService.getNotifications(user_id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getCurrentNotificationThunk  = createAsyncThunk(
  'notifications/current/',
  async ({ uuid }, thunkAPI) => {
    try {
      const response = await NotificationsService.getCurrentNotification(uuid);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteCurrentNotificationThunk  = createAsyncThunk(
  'notifications/delete/',
  async (uuid, thunkAPI) => {
    try {
      const response = await NotificationsService.deleteCurrentNotification(uuid);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const patchCurrentNotificationThunk  = createAsyncThunk(
  'notifications/patch/',
  async ({uuid, formData} , thunkAPI) => {
    try {
      const response = await NotificationsService.patchCurrentNotification(uuid, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);