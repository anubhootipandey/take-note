import { createSlice } from '@reduxjs/toolkit';
import { UIState } from '../types';

const initialState: UIState = {
  darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
  sidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;