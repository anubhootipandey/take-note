import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../types';

const initialState: NotesState = {
  items: JSON.parse(localStorage.getItem('notes') || '[]'),
  activeNoteId: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.items.push(action.payload);
      localStorage.setItem('notes', JSON.stringify(state.items));
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.items.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('notes', JSON.stringify(state.items));
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(note => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(state.items));
    },
    setActiveNote: (state, action: PayloadAction<string | null>) => {
      state.activeNoteId = action.payload;
    },
    moveNote: (state, action: PayloadAction<{ noteId: string; folderId: string }>) => {
      const note = state.items.find(note => note.id === action.payload.noteId);
      if (note) {
        note.folderId = action.payload.folderId;
        localStorage.setItem('notes', JSON.stringify(state.items));
      }
    },
  },
});

export const { addNote, updateNote, deleteNote, setActiveNote, moveNote } = notesSlice.actions;
export default notesSlice.reducer;