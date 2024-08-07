import { createSlice } from '@reduxjs/toolkit';
import { getTaskListThunk, addTaskThunk } from './taskThunk';

const initialState = {
  taskList: [],
  selectedSubtask: {},
  seeResizebleDiv: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskList(state, action) {
      state.taskList = action.payload;
    },
    setSelectedSubtask(state, action) {
      state.selectedSubtask = action.payload;
    },
    setSeeResizebleDiv(state, action) {
      state.seeResizebleDiv = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getTaskListThunk.fulfilled, (state, action) => {
      state.taskList = action.payload;
    })
    .addCase(getTaskListThunk.rejected, (state, action) => {
      state.taskList = [];
      console.error('Error fetching project headers:', action.payload);
    })
    .addCase(addTaskThunk.fulfilled, (state, action) => {
      state.taskList = [...taskList, action.payload];
    })
    .addCase(addTaskThunk.rejected, (state, action) => {
      console.error('Error fetching project headers:', action.payload);
    });
  },
});

export const { setTaskList, setSelectedSubtask, setSeeResizebleDiv } = taskSlice.actions;
export default taskSlice.reducer;
