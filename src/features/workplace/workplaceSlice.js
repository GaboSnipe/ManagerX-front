import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folderInfo: {},
  fileInfo: {},
};

const workplaceSlice = createSlice({
  name: 'workplace',
  initialState,
  reducers: {
    setFile(state, action) {
      state.fileInfo = action.payload;
    },
    setFolder(state, action) {
      state.folderInfo = action.payload;
    },
  },
});

export const {
  setFile,
  setFolder,
} = workplaceSlice.actions;
export default workplaceSlice.reducer;
