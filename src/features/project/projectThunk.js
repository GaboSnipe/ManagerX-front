import { createAsyncThunk } from '@reduxjs/toolkit';
import ProjectsService from '../../services/ProjectsService';

export const getProjectListThunk = createAsyncThunk(
  'document/list/',
  async ({ settings }, thunkAPI) => {
    try {
      const response = await ProjectsService.getProjectList(settings);
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
      // const response = await ProjectsService.getProjectDetails(uuid);
      // return response.data;
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
export const createNewProjectThunk = createAsyncThunk(
  'document/create/project/',
  async ({ conclusionNumber, task }, thunkAPI) => {
    try {
      const response = await ProjectsService.createNewProject(conclusionNumber, task);
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);
