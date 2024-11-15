import { createSlice } from '@reduxjs/toolkit';
import { getTaskListThunk, addTaskThunk, editTaskThunk, editSubTaskThunk, getSubTaskThunk, addSubTAsk } from './taskThunk';

const initialState = {
  taskList: [],
  selectedSubtask: {},
  selectedSubTaskEdit: {},
  seeResizebleDiv: false,
  isAddEnable: false,
  isEditingSubTask: false,
  isOpenFolderShareQuestion: false,
  folderSharePersonUuid: null,
  sharedFolderPath: null,
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
    setIsOpenFolderShareQuestion(state, action) {
      state.isOpenFolderShareQuestion = action.payload;
    },
    setFolderSharePersonUuid(state, action) {
      state.folderSharePersonUuid = action.payload;
    },
    setSharedFolderPath(state, action) {
      state.sharedFolderPath = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskListThunk.fulfilled, (state, action) => {
        state.tasksCount = action.payload.count;
        state.taskList = action.payload.results;
      })
      .addCase(getTaskListThunk.rejected, (state, action) => {
        state.taskList = [];
        console.error('Error fetching task list:', action.payload);
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.taskList = [...state.taskList, action.payload];
        if(action.payload.drive_folder_path){
          state.folderSharePersonUuid = action.payload.assign_to;
          state.sharedFolderPath = action.payload.drive_folder_path;
          state.isOpenFolderShareQuestion = true;
        }
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        console.error('Error adding task:', action.payload);
      })
      .addCase(addSubTAsk.fulfilled, (state, action) => {
        state.taskList = state.taskList.map(task => {
          if (task.uuid === action.payload.task) {
            return {
              ...task,
              subtasks: [...task.subtasks, action.payload]
            };
          }
          return task;
        });
      })
      .addCase(addSubTAsk.rejected, (state, action) => {
        console.error('Error editing task:', action.payload);
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

export const { setTaskList, setIsAddEnable, setSelectedSubtask, setSeeResizebleDiv, setIsEditingSubTask, setSelectedSubTaskEdit, setIsOpenFolderShareQuestion, setFolderSharePersonUuid, setSharedFolderPath } = taskSlice.actions;
export default taskSlice.reducer;
