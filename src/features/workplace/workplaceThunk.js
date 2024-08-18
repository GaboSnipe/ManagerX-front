import { createAsyncThunk } from '@reduxjs/toolkit';
import FileService from '../../services/FileService';

export const getFolderListThunk = createAsyncThunk(
  'folder/getList',
  async (_, thunkAPI) => {
    try {
      const response = await FileService.getFolderList();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

export const getFolderDetailsThunk = createAsyncThunk(
  'folder/getDetails',
  async (folderId, thunkAPI) => {
    try {
      const response = await FileService.getFolderDetails(folderId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Unknown error');
    }
  }
);

export const addFileInFolderThunk = createAsyncThunk(
  'files/addFileInFolder',
  async (formData, thunkAPI) => {
    try {
      const response = await FileService.addFileInFolder(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Failed to add file');
    }
  }
);
export const addFolderThunk = createAsyncThunk(
  'files/addFolder',
  async (formData, thunkAPI) => {
    try {
      const response = await FileService.addFolder(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || 'Failed to add file');
    }
  }
);

export const deleteFileThunk = createAsyncThunk(
  'workplace/deleteFile',
  async (fileUuid, thunkAPI) => {
    try {
      // const response = await axios.delete(`/api/files/${fileUuid}`);
      // return response.data;
      return ;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data || 'Failed to delete file');

    }
  }
);