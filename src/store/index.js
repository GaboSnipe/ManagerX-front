import { configureStore, combineReducers } from '@reduxjs/toolkit';
import choosedProjectReducer from "./choosedProjectReducer"
import choosedWorkPlaceReducer from './choosedWorkPlaceReducer';


const rootReducer = combineReducers({
    project: choosedProjectReducer,
    WorkPlace: choosedWorkPlaceReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
