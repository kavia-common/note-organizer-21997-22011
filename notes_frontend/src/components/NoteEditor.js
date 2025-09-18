import React, { useContext, useMemo, useState, useEffect } from "react";
import { NotesContext } from "../context/NotesContext";
import { theme } from "../theme";
import { useDebouncedState } from "../hooks/useDebouncedState";

/**
 * PUBLIC_INTERFACE
 * NoteEditor: Editor/viewer for the active note. Includes title and content editing with debounced persistence.
 */
export default function NoteEditor() {
  const { notes, activeId, updateNote, deleteNote, setActiveId } = useContext(NotesContext);

  const active = useMemo(() => notes.find(n => n.id === activeId) || null, [notes, activeId]);

  const [title, setTitle] = useState(active?.title || "");
  const [content, setContent] = useState(active?.content || "");
  const debouncedTitle = useDebouncedState(title, 250);
  const debouncedContent = useDebouncedState(content, 250);

  useEffect(() => {
    // sync local state when active changes
    setTitle(active?.title || "");
    setContent(active?.content || "");
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!active) return;
    if (debouncedTitle !== active.title) {
      updateNote(active.id, { title: debouncedTitle });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle]);

  useEffect(() => {
    if (!active) return;
    if (debouncedContent !== active.content) {
      updateNote(active.id, { content: debouncedContent });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent]);

  if (!active) {
    return (
      <div style={styles.emptyWrap}>
        <div style={styles.emptyCard}>
          <div style={styles.emptyBadge}>No note selected</div>
          <p style={styles.emptyText}>Create a new note or select one from the list.</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    const ok = window.confirm("Delete this note? This cannot be undone.");
    if (!ok) return;
    deleteNote(active.id);
    setActiveId(null);
  };

  return (
    <div style={styles.editorWrap}>
      <div style={styles.header}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          style={styles.titleInput}
          aria-label="Note title"
        />
        <div style={styles.headerActions}>
          <span style={styles.timestamp}>Updated {formatTime(active.updatedAt)}</span>
          <button style={styles.deleteBtn} onClick={handleDelete} aria-label="Delete note">
            Delete
          </button>
        </div>
      </div>

      <div style={styles.editorCard}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your thoughts..."
          style={styles.textarea}
          aria-label="Note content"
        />
      </div>
    </div>
  );
}

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return "";
  }
}

const styles = {
  editorWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    height: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    padding: "8px 6px",
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 700,
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: theme.colors.text,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  deleteBtn: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(239,68,68,0.25)",
    background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(255,255,255,1))",
    color: theme.colors.error,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
  },
  editorCard: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 14,
    boxShadow: theme.shadow.md,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  textarea: {
    border: "none",
    outline: "none",
    resize: "none",
    padding: 16,
    fontSize: 14,
    lineHeight: 1.6,
    minHeight: 280,
    height: "100%",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    background:
      "linear-gradient(180deg, rgba(37,99,235,0.03), rgba(255,255,255,1))",
    color: theme.colors.text,
  },
  emptyWrap: {
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
  emptyCard: {
    padding: 24,
    borderRadius: 14,
    background: theme.colors.surface,
    border: `1px dashed ${theme.colors.border}`,
    textAlign: "center",
  },
  emptyBadge: {
    display: "inline-block",
    padding: "6px 10px",
    background: "rgba(37,99,235,0.08)",
    color: theme.colors.primary,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8,
  },
  emptyText: {
    margin: 0,
    color: theme.colors.textMuted,
    fontSize: 13,
  },
};
