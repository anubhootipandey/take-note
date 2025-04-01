import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Menu, Sun, Moon, Plus } from 'lucide-react';
import { RootState } from './types';
import { addNote, moveNote } from './store/notesSlice';
import { toggleDarkMode, toggleSidebar } from './store/uiSlice';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);
  const activeFolderId = useSelector((state: RootState) => state.folders.activeFolderId);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCreateNote = () => {
    if (!activeFolderId) return;

    const newNote = {
      id: crypto.randomUUID(),
      title: 'Untitled',
      content: '',
      folderId: activeFolderId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch(addNote(newNote));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    dispatch(moveNote({
      noteId: draggableId,
      folderId: destination.droppableId,
    }));
  };

  return (
    <div className={`h-screen flex flex-col bg-white dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Take Note</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreateNote}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            disabled={!activeFolderId}
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 flex overflow-hidden">
          {sidebarOpen && <Sidebar />}
          <Editor />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;