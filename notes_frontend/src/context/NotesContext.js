import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

// Simple id generator for local-only data
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// PUBLIC_INTERFACE
export const NotesContext = createContext({
  notes: [],
  activeId: null,
  setActiveId: () => {},
  createNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  search: "",
  setSearch: () => {},
});

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /**
   * Provides in-memory CRUD with localStorage persistence.
   * Designed so a future backend integration can replace the internals without changing consumers.
   */
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem("notes.v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");

  // Persist to localStorage for now
  useEffect(() => {
    try {
      localStorage.setItem("notes.v1", JSON.stringify(notes));
    } catch {
      // noop
    }
  }, [notes]);

  // Ensure activeId remains valid
  useEffect(() => {
    if (activeId && !notes.find(n => n.id === activeId)) {
      setActiveId(notes[0]?.id ?? null);
    }
  }, [notes, activeId]);

  const createNote = useCallback(() => {
    const now = new Date().toISOString();
    const newNote = {
      id: genId(),
      title: "Untitled",
      content: "",
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveId(newNote.id);
    return newNote.id;
  }, []);

  const updateNote = useCallback((id, patch) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n
      )
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      notes,
      activeId,
      setActiveId,
      createNote,
      updateNote,
      deleteNote,
      search,
      setSearch,
    }),
    [notes, activeId, createNote, updateNote, deleteNote, search]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}
