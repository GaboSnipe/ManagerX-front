import { createSlice } from '@reduxjs/toolkit';
import { getTaskListThunk, addTaskThunk, editTaskThunk, editSubTaskThunk, getSubTaskThunk } from './taskThunk';

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
        console.error('Error fetching task list:', action.payload);
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.taskList = [...state.taskList, action.payload];
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        console.error('Error adding task:', action.payload);
      })
      .addCase(editTaskThunk.fulfilled, (state, action) => {
        state.taskList = state.taskList.map(task =>
          task.uuid === action.payload.uuid ? action.payload : task
        );
      })
      .addCase(editTaskThunk.rejected, (state, action) => {
        console.error('Error editing task:', action.payload);
      })
      .addCase(getSubTaskThunk.fulfilled, (state, action) => {
        state.selectedSubtask = action.payload;
      })
      .addCase(getSubTaskThunk.rejected, (state, action) => {
        console.error('Error editing task:', action.payload);
      })
      .addCase(editSubTaskThunk.fulfilled, (state, action) => {
        state.taskList = state.taskList.map(task => {
          if (task.uuid === action.payload.task) {
            return {
              ...task,
              subtasks: task.subtasks.map(subtask =>
                subtask.uuid === action.payload.uuid ? action.payload : subtask
              ),
            };
          }
          return task;
        });
      })
      .addCase(editSubTaskThunk.rejected, (state, action) => {
        console.error('Error editing task:', action.payload);
      });
  },
});

export const { setTaskList, setIsAddEnable, setSelectedSubtask, setSeeResizebleDiv, setIsEditingSubTask, setSelectedSubTaskEdit } = taskSlice.actions;
export default taskSlice.reducer;
