import { createSlice } from '@reduxjs/toolkit';
import { getTaskListThunk, addTaskThunk, editTaskThunk } from './taskThunk';

const initialState = {
  taskList: [],
  selectedSubtask: {},
  selectedSubTaskEdit: {},
  seeResizebleDiv: false,
  isAddEnable: false,
  isEditingSubTask: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskList(state, action) {
      state.taskList = action.payload;
    },
    setIsEditingSubTask(state, action) {
      state.isEditingSubTask = action.payload;
    },
    setIsAddEnable(state, action) {
      state.isAddEnable = action.payload;
    },
    setSelectedSubtask(state, action) {
      state.selectedSubtask = action.payload;
    },
    setSelectedSubTaskEdit(state, action) {
      state.selectedSubTaskEdit = action.payload;
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
    })
    .addCase(editTaskThunk.fulfilled, (state, action) => {
      state.taskList = [...taskList, action.payload];
    })
    .addCase(editTaskThunk.rejected, (state, action) => {
      console.error('Error fetching project headers:', action.payload);
    });
  },
});

export const { setTaskList, setIsAddEnable, setSelectedSubtask, setSeeResizebleDiv, setIsEditingSubTask, setSelectedSubTaskEdit } = taskSlice.actions;
export default taskSlice.reducer;
