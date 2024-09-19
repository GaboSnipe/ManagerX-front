import { createSlice } from '@reduxjs/toolkit';
import { getProjectListThunk, getProjectDetailsThunk, getProjectHeadersThunk, getFilesListThunk } from './projectThunk';

const initialState = {
  projectInfo: {},
  projectList: [],
  projectHeaders: [],
  fileList: [],
  fileInfo: {},
  seeResizebleDiv: false,
  selectedRowId: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action) {
      state.projectInfo = action.payload;
    },
    setFileInfo(state, action) {
      state.fileInfo = action.payload;
    },
    setProjectList(state, action) {
      state.projectList = action.payload;
    },
    setProjectHeaders(state, action) {
      state.projectHeaders = action.payload;
    },
    setProjectSeeResizebleDiv(state, action) {
      state.seeResizebleDiv = action.payload;
    },
    setFileList(state, action) {
      state.fileList = action.payload;
    },
    setSelectedRowId(state, action) {
      state.selectedRowId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectListThunk.fulfilled, (state, action) => {
        state.projectList = action.payload;
      })
      .addCase(getProjectListThunk.rejected, (state, action) => {
        state.projectList = [];
        console.error('Error fetching project list:', action.payload);
      })
      .addCase(getProjectDetailsThunk.fulfilled, (state, action) => {
        state.projectInfo = action.payload;
      })
      .addCase(getProjectDetailsThunk.rejected, (state, action) => {
        state.projectInfo = {};
        console.error('Error fetching project details:', action.payload);
      })
      .addCase(getFilesListThunk.fulfilled, (state, action) => {
        state.fileList = action.payload.files;
      })
      .addCase(getFilesListThunk.rejected, (state, action) => {
        state.fileList = [];
        console.error('Error fetching files list:', action.payload);
      })
      .addCase(getProjectHeadersThunk.fulfilled, (state, action) => {
        state.projectHeaders = action.payload;
      })
      .addCase(getProjectHeadersThunk.rejected, (state, action) => {
        state.projectHeaders = [];
        console.error('Error fetching project headers:', action.payload);
      });
  },
});

export const { setProject, setFileInfo, setProjectSeeResizebleDiv, setSelectedRowId, setProjectHeaders, setProjectList, setFileList } = projectSlice.actions;
export default projectSlice.reducer;
