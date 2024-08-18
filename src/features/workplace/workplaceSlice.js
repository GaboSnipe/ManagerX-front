import { createSlice } from '@reduxjs/toolkit';
import { getFolderListThunk, getFolderDetailsThunk, addFileInFolderThunk, deleteFileThunk, addFolderThunk } from "./workplaceThunk";

const initialState = {
  folderInfo: {},
  folderList: [],
  fileInfo: {},
  fileList: [],
  showFileIcon: false,
  loading: false,
  seeResizebleDiv: false,
  error: null,
};

const workplaceSlice = createSlice({
  name: 'workplace',
  initialState,  
  reducers: {
    setFile(state, action) {
      state.fileInfo = action.payload;
    },
    setFileList(state, action) {
      state.fileList = action.payload;
    },
    setSeeResizebleDiv(state, action) {
      state.seeResizebleDiv = action.payload;
    },
    setFolderList(state, action) {
      state.folderList = action.payload;
    },
    setFolder(state, action) {
      state.folderInfo = action.payload;
    },
    setShowFileIcon(state, action) {
      state.showFileIcon = action.payload;
    },
    removeFolder(state, action) {
      state.folderList = state.folderList.filter(folder => folder.uuid !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFolderListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFolderListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.folderList = action.payload;
      })
      .addCase(getFolderListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch folder list';
        console.error(action.payload);
      })
      .addCase(getFolderDetailsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFolderDetailsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.folderInfo = action.payload;
        state.fileList = action.payload.files;
      })
      .addCase(getFolderDetailsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch folder details';
        console.error(action.payload);
      })
      .addCase(addFileInFolderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFileInFolderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fileList = [...state.fileList, action.payload];
      })
      .addCase(addFileInFolderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add file';
        console.error(action.payload);
      })
      .addCase(addFolderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFolderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.folderList = [...state.folderList, action.payload];
      })
      .addCase(addFolderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add folder';
        console.error(action.payload);
      })
      .addCase(deleteFileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.folderList = state.folderList.filter(folder => folder.uuid !== action.meta.arg);
        state.folderInfo = {};
      })
      .addCase(deleteFileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFile,
  setFolder,
  removeFolder,
  setFileList,
  setFolderList,
  setSeeResizebleDiv,
  setShowFileIcon,
} = workplaceSlice.actions;
export default workplaceSlice.reducer;
