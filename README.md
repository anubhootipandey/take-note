# 📝 Take Note – A Modern Note-Taking App

Take Note is a **minimalistic yet powerful note-taking web app** built using **React**, **Redux Toolkit**, and **Tailwind CSS**. It offers a smooth writing experience, drag-and-drop note management, dark mode, and a responsive UI optimized for productivity.

---

## 🚀 Features

* 📂 **Folder-based organization** of notes
* 📝 **Rich markdown-compatible editor** (customizable)
* 🌙 **Dark/Light mode toggle**
* ➕ **Create and manage notes quickly**
* 📦 **Drag-and-drop support** to move notes between folders (via `react-beautiful-dnd`)
* 🌟 **Redux Toolkit** for clean and scalable state management
* 🧠 **Persisted state** for seamless user experience
* 📱 **Fully responsive** and mobile-friendly design

---

## 🛠️ Tech Stack

* **React** – UI Library
* **Redux Toolkit** – State management
* **React Redux** – For connecting state to components
* **Tailwind CSS** – Utility-first styling
* **React Beautiful DnD** – For drag-and-drop functionality
* **Lucide React** – Beautiful and modern icon library
* **TypeScript** – Strong typing support

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── Editor.tsx
│   └── Sidebar.tsx
│
├── store/
|   ├── foldersSlice.ts
│   ├── notesSlice.ts
│   ├── uiSlice.ts
│   └── index.ts
│
├── types/
|   ├── html2pdf.d.ts
│   └── index.ts (RootState and custom types)
│
├── App.tsx
└── index.tsx
```

---

## 💡 How It Works

* Notes are created inside active folders and assigned a unique UUID.
* Drag-and-drop allows users to move notes across folders.
* Global dark/light theme toggle using Tailwind’s dark mode class.
* Redux slices manage notes, folders, and UI state.

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/anubhootipandey/take-note.git
cd take-note

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

> ✨ Want to contribute? Open a pull request or issue!

---

## 📷 Screenshots

| Light Mode                                    |
| --------------------------------------------- | -------------------------------------------- |
| <img width="1360" height="542" alt="Screenshot 2025-07-21 002621" src="https://github.com/user-attachments/assets/ecf9dd4f-76cb-41fa-82b1-7d9689cf855a" /> |
| Dark Mode                                    |
| <img width="1359" height="548" alt="Screenshot 2025-07-21 002638" src="https://github.com/user-attachments/assets/5535da39-b7a5-49c5-b42f-91eb63b4c638" /> |

---

## 🔮 Future Improvements

* Markdown support
* Search across notes
* Cloud sync & backup
* Authentication
* Tags and filters

---

## 🧑‍💻 Author

**Anubhooti Pandey**
* Full Stack Developer | Frontend Developer

---
