import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Folder, Plus, Trash2 } from 'lucide-react';
import { RootState } from '../types';
import { addFolder, deleteFolder, setActiveFolder } from '../store/foldersSlice';
import { setActiveNote } from '../store/notesSlice';

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.items);
  const notes = useSelector((state: RootState) => state.notes.items);
  const activeFolderId = useSelector((state: RootState) => state.folders.activeFolderId);
  const activeNoteId = useSelector((state: RootState) => state.notes.activeNoteId);

  const handleAddFolder = () => {
    const newFolder = {
      id: crypto.randomUUID(),
      name: 'New Folder',
      createdAt: Date.now(),
    };
    dispatch(addFolder(newFolder));
  };

  const handleDeleteFolder = (folderId: string) => {
    dispatch(deleteFolder(folderId));
  };

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Folders</h2>
        <button
          onClick={handleAddFolder}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="space-y-2">
        {folders.map(folder => (
          <div
            key={folder.id}
            className="space-y-1"
          >
            <div
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                activeFolderId === folder.id ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => dispatch(setActiveFolder(folder.id))}
            >
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{folder.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.id);
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <Trash2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {activeFolderId === folder.id && (
              <div className="ml-4 space-y-1">
                {notes
                  .filter(note => note.folderId === folder.id)
                  .map(note => (
                    <div
                      key={note.id}
                      className={`flex items-center p-2 rounded cursor-pointer ${
                        activeNoteId === note.id ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => dispatch(setActiveNote(note.id))}
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">{note.title || 'Untitled'}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};