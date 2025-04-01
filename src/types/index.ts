export interface Note {
    id: string;
    title: string;
    content: string;
    folderId: string;
    createdAt: number;
    updatedAt: number;
  }
  
  export interface Folder {
    id: string;
    name: string;
    createdAt: number;
  }
  
  export interface RootState {
    notes: NotesState;
    folders: FoldersState;
    ui: UIState;
  }
  
  export interface NotesState {
    items: Note[];
    activeNoteId: string | null;
  }
  
  export interface FoldersState {
    items: Folder[];
    activeFolderId: string | null;
  }
  
  export interface UIState {
    darkMode: boolean;
    sidebarOpen: boolean;
  }