import { createSlice } from '@reduxjs/toolkit';
import { getTaskListThunk, addTaskThunk } from './taskThunk';

const initialState = {
  taskList: [],
  selectTask: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskList(state, action) {
      state.taskList = action.payload;
    },
    setSelectTask(state, action) {
      state.selectTask = action.payload;
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

export const { setTaskList, setSelectTask } = taskSlice.actions;
export default taskSlice.reducer;
