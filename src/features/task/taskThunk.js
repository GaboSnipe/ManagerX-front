import { createAsyncThunk } from '@reduxjs/toolkit';
import TaskService from '../../services/TaskService';

export const getTaskListThunk  = createAsyncThunk(
  'task/list/',
  async (_, thunkAPI) => {
    try {
      const response = await TaskService.getTaskList();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addTaskThunk  = createAsyncThunk(
  'task/add/',
  async (formData, thunkAPI) => {
    try {
      const response = await TaskService.addTask(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);