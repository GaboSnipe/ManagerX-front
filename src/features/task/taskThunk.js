import { createAsyncThunk } from '@reduxjs/toolkit';
import TaskService from '../../services/TaskService';

export const getTaskListThunk = createAsyncThunk(
  'task/list/',
  async (settings, thunkAPI) => {
    try {
      const response = await TaskService.getTaskList(settings);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getSubTaskThunk = createAsyncThunk(
  'task/subtask/details/',
  async (uuid, thunkAPI) => {
    try {
      const response = await TaskService.getSubTask(uuid);
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
export const editTaskThunk = createAsyncThunk(
  'task/edit',
  async ({ uuid, formData }, thunkAPI) => {
    try {
      const response = await TaskService.editTask(uuid, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editSubTaskThunk = createAsyncThunk(
  'subtask/edit',
  async ({ uuid, formData }, thunkAPI) => {
    try {
      const response = await TaskService.editSubTask(uuid, formData);
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