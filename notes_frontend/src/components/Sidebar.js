import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { theme } from "../theme";

/**
 * PUBLIC_INTERFACE
 * Sidebar: App navigation with branding, search, and create note action.
 */
export default function Sidebar() {
  const { createNote, search, setSearch } = useContext(NotesContext);

  return (
    <aside style={styles.aside} aria-label="Sidebar">
      <div style={styles.brand}>
        <div style={styles.brandMark}>
          <div style={styles.brandDot} />
        </div>
        <div>
          <div style={styles.brandTitle}>Ocean Notes</div>
          <div style={styles.brandSub}>Focus. Capture. Iterate.</div>
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.primaryBtn} onClick={createNote} aria-label="Create new note">
          <span style={{ marginRight: 8 }}>＋</span> New Note
        </button>
      </div>

      <div style={styles.searchWrap}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          style={styles.searchInput}
          aria-label="Search notes"
        />
      </div>

      <div style={styles.footer}>
        <span style={styles.footerText}>Ocean Professional</span>
      </div>
    </aside>
  );
}

const styles = {
  aside: {
    width: 280,
    background: theme.colors.surface,
    borderRight: `1px solid ${theme.colors.border}`,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "6px 8px",
    borderRadius: "10px",
    background: theme.gradient,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #60a5fa 100%)`,
    boxShadow: theme.shadow.md,
    position: "relative",
    display: "grid",
    placeItems: "center",
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    background: theme.colors.secondary,
    boxShadow: `0 0 0 3px rgba(245,158,11,0.25)`,
  },
  brandTitle: {
    fontWeight: 700,
    color: theme.colors.text,
    fontSize: 18,
  },
  brandSub: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  primaryBtn: {
    border: "none",
    cursor: "pointer",
    padding: "12px 14px",
    borderRadius: 10,
    fontWeight: 600,
    color: "white",
    background:
      "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(99,102,241,1) 100%)",
    boxShadow: theme.shadow.md,
    transition: "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
  },
  searchWrap: {
    marginTop: 8,
  },
  searchInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.background,
    outline: "none",
    color: theme.colors.text,
    transition: "box-shadow 160ms ease, border-color 160ms ease",
  },
  footer: {
    marginTop: "auto",
    borderTop: `1px solid ${theme.colors.border}`,
    paddingTop: 12,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
};
