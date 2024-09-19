import { createAsyncThunk } from '@reduxjs/toolkit';
import FileService from '../../services/FileService';
import { toast } from 'react-toastify';

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
        await FileService.deleteFile(fileUuid);
      return ;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data || 'Failed to delete file');

    }
  }
);

export const deleteFolderThunk = createAsyncThunk(
  'workplace/deleteFolder',
  async (folderUuid, thunkAPI) => {
    try {
      await FileService.deleteFolder(folderUuid);
    } catch (err) {
      toast.error(err.message, {
        containerId : "error"
      })
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response.data || 'Failed to delete folder');
      
    }
  }
);
export const getRcFileList = createAsyncThunk(
  'workplace/rclone/getfile',
  async (settings, { rejectWithValue }) => {
    try {
      const response = await FileService.getSincFolderList(settings);
      return response.data;
    } catch (err) {
      toast.error(err.message, {
        containerId: "error"
      });
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data || 'Failed');
    }
  }
);

export const createRcFolder = createAsyncThunk(
  'workplace/rclone/createFolder',
  async (remotePath, { rejectWithValue }) => {
    try {
      const result = await FileService.rcMkdir("GoogleDrive:", remotePath);
      return result;
    } catch (err) {
      toast.error(err.message, {
        containerId: "error"
      });
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data || 'Failed');
    }
  }
);
export const uploadRcFile = createAsyncThunk(
  'workplace/rclone/uploadRcFile',
  async ({ remotePath, file }, { rejectWithValue }) => {
    try {
      await FileService.rcUploadFile("GoogleDrive:", remotePath, file);
    } catch (err) {
      toast.error(err.message, {
        containerId: "error"
      });
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data || 'Failed');
    }
  }
);
