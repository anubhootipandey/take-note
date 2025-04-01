import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';
import foldersReducer from './foldersSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    folders: foldersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;