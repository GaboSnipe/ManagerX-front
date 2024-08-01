import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './features/project/projectSlice';
import workplaceReducer from './features/workplace/workplaceSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    workplace: workplaceReducer,
  },
});

export default store;
