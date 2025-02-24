import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './features/project/projectSlice';
import workplaceReducer from './features/workplace/workplaceSlice';
import authReducer from './features/auth/authSlice';
import taskReducer from './features/task/taskSlice';
import notificationsReducer from './features/notifications/notificationsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    workplace: workplaceReducer,
    task: taskReducer,
    notifications: notificationsReducer,
  },
});

export default store;
