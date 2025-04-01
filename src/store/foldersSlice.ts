import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folder, FoldersState } from '../types';

const initialState: FoldersState = {
  items: JSON.parse(localStorage.getItem('folders') || '[]'),
  activeFolderId: null,
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.items.push(action.payload);
      localStorage.setItem('folders', JSON.stringify(state.items));
    },
    updateFolder: (state, action: PayloadAction<Folder>) => {
      const index = state.items.findIndex(folder => folder.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('folders', JSON.stringify(state.items));
      }
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(folder => folder.id !== action.payload);
      localStorage.setItem('folders', JSON.stringify(state.items));
    },
    setActiveFolder: (state, action: PayloadAction<string | null>) => {
      state.activeFolderId = action.payload;
    },
  },
});

export const { addFolder, updateFolder, deleteFolder, setActiveFolder } = foldersSlice.actions;
export default foldersSlice.reducer;