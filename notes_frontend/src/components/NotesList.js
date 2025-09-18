import React, { useContext, useMemo } from "react";
import { NotesContext } from "../context/NotesContext";
import { theme } from "../theme";

/**
 * PUBLIC_INTERFACE
 * NotesList: Displays a list of notes and allows selecting the active note.
 */
export default function NotesList() {
  const { notes, activeId, setActiveId, search } = useContext(NotesContext);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, search]);

  if (filtered.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyBadge}>No notes found</div>
        <p style={styles.emptyText}>
          Try creating a new note or adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.list} role="list">
      {filtered.map((n) => {
        const isActive = n.id === activeId;
        return (
          <button
            key={n.id}
            onClick={() => setActiveId(n.id)}
            style={{
              ...styles.item,
              ...(isActive ? styles.itemActive : null),
            }}
            role="listitem"
            aria-current={isActive ? "true" : "false"}
          >
            <div style={styles.itemHeader}>
              <span style={styles.itemTitle}>{n.title || "Untitled"}</span>
              <span
                style={{
                  ...styles.itemTime,
                  color: isActive ? theme.colors.surface : theme.colors.textMuted,
                }}
              >
                {formatTime(n.updatedAt)}
              </span>
            </div>
            <div
              style={{
                ...styles.itemPreview,
                color: isActive ? "rgba(255,255,255,0.85)" : theme.colors.textMuted,
              }}
            >
              {n.content ? n.content.slice(0, 80) : "Start typing..."}
            </div>
          </button>
        );
      })}
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  item: {
    textAlign: "left",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 12,
    padding: 12,
    cursor: "pointer",
    boxShadow: theme.shadow.sm,
    transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
  },
  itemActive: {
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(99,102,241,0.95))",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: theme.shadow.md,
    color: "white",
    transform: "translateY(-1px)",
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },
  itemTitle: {
    fontWeight: 700,
    color: "inherit",
  },
  itemTime: {
    fontSize: 12,
  },
  itemPreview: {
    fontSize: 13,
    lineHeight: 1.4,
  },
  empty: {
    padding: 24,
    border: `1px dashed ${theme.colors.border}`,
    borderRadius: 12,
    textAlign: "center",
    background: theme.colors.surface,
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
