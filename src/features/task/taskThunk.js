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
export const editTaskThunk  = createAsyncThunk(
  'task/edit/',
  async (uuid, formData, thunkAPI) => {
    try {
      const response = await TaskService.editTask(uuid, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addSubTAsk  = createAsyncThunk(
  'subtask/add/',
  async (formData, thunkAPI) => {
    try {
      const response = await TaskService.createSubTask(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);