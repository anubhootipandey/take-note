import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Save, FileDown, Trash2, Bold, Italic, Type, Highlighter, Palette, Text as TextSize } from 'lucide-react';
import { RootState } from '../types';
import { updateNote, deleteNote } from '../store/notesSlice';
import html2pdf from 'html2pdf.js';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const activeNoteId = useSelector((state: RootState) => state.notes.activeNoteId);
  const note = useSelector((state: RootState) =>
    state.notes.items.find(note => note.id === activeNoteId)
  );
  const [isPreview, setIsPreview] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (note) {
      dispatch(updateNote({
        ...note,
        content: e.target.value,
        updatedAt: Date.now(),
      }));
    }
  };

  const handleTextSelection = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setSelectedText(textareaRef.current.value.substring(start, end));
    }
  };

  const applyStyle = (style: string) => {
    if (!textareaRef.current || !selectedText) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const content = textareaRef.current.value;

    let newText = '';
    switch (style) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        break;
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        break;
      case 'highlight':
        newText = content.substring(0, start) + `==${selectedText}==` + content.substring(end);
        break;
      case 'uppercase':
        newText = content.substring(0, start) + selectedText.toUpperCase() + content.substring(end);
        break;
      case 'lowercase':
        newText = content.substring(0, start) + selectedText.toLowerCase() + content.substring(end);
        break;
      case 'h1':
        newText = content.substring(0, start) + `# ${selectedText}` + content.substring(end);
        break;
      case 'h2':
        newText = content.substring(0, start) + `## ${selectedText}` + content.substring(end);
        break;
      case 'h3':
        newText = content.substring(0, start) + `### ${selectedText}` + content.substring(end);
        break;
      case 'color-red':
        newText = content.substring(0, start) + `<span style="color: red">${selectedText}</span>` + content.substring(end);
        break;
      case 'color-blue':
        newText = content.substring(0, start) + `<span style="color: blue">${selectedText}</span>` + content.substring(end);
        break;
      case 'color-green':
        newText = content.substring(0, start) + `<span style="color: green">${selectedText}</span>` + content.substring(end);
        break;
    }

    if (note && newText) {
      dispatch(updateNote({
        ...note,
        content: newText,
        updatedAt: Date.now(),
      }));
    }
  };

  const handleExportPDF = async () => {
    if (note) {
      const element = document.createElement('div');
      element.innerHTML = `
        <h1>${note.title}</h1>
        <div>${note.content}</div>
      `;
      
      const opt = {
        margin: 1,
        filename: `${note.title || 'note'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    }
  };

  const handleExportTXT = () => {
    if (note) {
      const element = document.createElement('a');
      const file = new Blob([note.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${note.title || 'note'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Select or create a note to start editing
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={note.title}
          onChange={(e) => dispatch(updateNote({ ...note, title: e.target.value }))}
          className="text-xl font-semibold bg-transparent border-none outline-none text-gray-700 dark:text-gray-200"
          placeholder="Untitled"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleExportPDF}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Export as PDF"
          >
            <FileDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={handleExportTXT}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Export as TXT"
          >
            <Save className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => dispatch(deleteNote(note.id))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Delete note"
          >
            <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {!isPreview && (
        <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => applyStyle('bold')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Bold"
          >
            <Bold className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => applyStyle('italic')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Italic"
          >
            <Italic className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => applyStyle('highlight')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Highlight"
          >
            <Highlighter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-600" />
          <button
            onClick={() => applyStyle('uppercase')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Uppercase"
          >
            <Type className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => applyStyle('lowercase')}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Lowercase"
          >
            <Type className="w-4 h-4 text-gray-600 dark:text-gray-400 rotate-180" />
          </button>
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-600" />
          <div className="relative group">
            <button
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Text Color"
            >
              <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="absolute hidden group-hover:flex gap-1 bg-white dark:bg-gray-800 shadow-lg rounded p-1 z-10">
              <button
                onClick={() => applyStyle('color-red')}
                className="w-6 h-6 bg-red-500 rounded"
              />
              <button
                onClick={() => applyStyle('color-blue')}
                className="w-6 h-6 bg-blue-500 rounded"
              />
              <button
                onClick={() => applyStyle('color-green')}
                className="w-6 h-6 bg-green-500 rounded"
              />
            </div>
          </div>
          <div className="relative group">
            <button
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Heading Size"
            >
              <TextSize className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded p-1 z-10">
              <button
                onClick={() => applyStyle('h1')}
                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                Heading 1
              </button>
              <button
                onClick={() => applyStyle('h2')}
                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                Heading 2
              </button>
              <button
                onClick={() => applyStyle('h3')}
                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                Heading 3
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {isPreview ? (
          <div className="p-4 prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={note.content}
            onChange={handleContentChange}
            onSelect={handleTextSelection}
            className="w-full h-full p-4 bg-transparent border-none outline-none resize-none text-gray-700 dark:text-gray-200"
            placeholder="Start writing..."
          />
        )}
      </div>
    </div>
  );
};