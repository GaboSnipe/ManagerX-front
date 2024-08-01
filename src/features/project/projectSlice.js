import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectInfo: {},
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
    setFile(state, action) {
      state.fileInfo = action.payload;
    },
    setProjectSeeResizebleDiv(state, action) {
      state.seeResizebleDiv = action.payload;
    },
    setSelectedRowId(state, action) {
      state.selectedRowId = action.payload;
    },
  },
});

export const { setProject, setFile, setProjectSeeResizebleDiv, setSelectedRowId } = projectSlice.actions;
export default projectSlice.reducer;
