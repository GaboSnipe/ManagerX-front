import { createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsService from '../../services/ProjectsService';

export const getProjectListThunk  = createAsyncThunk(
  'document/list/',
  async (_, thunkAPI) => {
    try {
      const response = await ProjectsService.getProjectList();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getProjectDetailsThunk  = createAsyncThunk(
  'document/details/',
  async ({ uuid }, thunkAPI) => {
    try {
      const response = await ProjectsService.getProjectDetails(uuid);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getFilesListThunk  = createAsyncThunk(
  'document/details/files/',
  async ({ uuid }, thunkAPI) => {
    try {
      const response = await ProjectsService.getProjectDetails(uuid);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getProjectHeadersThunk  = createAsyncThunk(
  'document/headers/',
  async (_, thunkAPI) => {
    try {
      const response = await ProjectsService.getProjectHeaders();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);