# Notes Frontend - Ocean Professional

This frontend implements a modern, minimalist notes UI with a sidebar, notes list, and an active editor.

Key components:
- src/context/NotesContext.js: In-memory CRUD with localStorage persistence. Can be swapped for an API with minimal changes.
- src/components/Sidebar.js: Branding, New Note action, and Search input.
- src/components/NotesList.js: Filtered list with active selection.
- src/components/NoteEditor.js: Title and content editing with debounced updates.
- src/components/Layout.js: Layout wrapper assembling the UI.
- src/theme.js: Centralized design tokens.

Styling:
- Ocean Professional palette (primary #2563EB, secondary/success #F59E0B, error #EF4444).
- Clean surfaces, subtle shadows, rounded corners, and smooth transitions.
- Light, subtle gradient backgrounds to add depth.

Extensibility:
- Replace the local storage CRUD with API calls by modifying NotesProvider internals.
- Add folders/tags by extending the NotesContext shape and adding UI in Sidebar.
- Support multi-pane or modal features by composing in Layout.

Testing:
- Minimal smoke test asserts the Notes heading is rendered.
