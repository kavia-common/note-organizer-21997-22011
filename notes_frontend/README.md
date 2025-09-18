# Notes Frontend - Ocean Professional

A modern, minimalist notes app UI built with React, following the Ocean Professional theme.

## Features
- Sidebar with branding, New Note, and search
- Notes list with active selection and previews
- Editor with title and content, debounced auto-save
- LocalStorage persistence (no backend yet)
- Clean design with rounded corners, subtle shadows, and soft gradients

## Scripts
- `npm start` - start dev server
- `npm test` - run tests
- `npm run build` - production build

## Structure
- `src/theme.js` - theme tokens
- `src/context/NotesContext.js` - state + CRUD
- `src/components/` - Sidebar, NotesList, NoteEditor, Layout
- `src/App.js` - root composition

See ARCHITECTURE.md for more details.
