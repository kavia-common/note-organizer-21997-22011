import React from "react";
import Sidebar from "./Sidebar";
import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";
import { theme } from "../theme";

/**
 * PUBLIC_INTERFACE
 * Layout composing Sidebar, NotesList, and NoteEditor following the Ocean Professional style.
 */
export default function Layout() {
  return (
    <div style={styles.appWrap}>
      <Sidebar />
      <main style={styles.main}>
        <section style={styles.listPanel} aria-label="Notes list">
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>Notes</h2>
          </div>
          <NotesList />
        </section>

        <section style={styles.editorPanel} aria-label="Editor">
          <NoteEditor />
        </section>
      </main>
    </div>
  );
}

const styles = {
  appWrap: {
    display: "flex",
    minHeight: "100vh",
    background: theme.colors.background,
  },
  main: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "minmax(320px, 420px) 1fr",
    gap: 16,
    padding: 16,
    background: theme.gradient,
  },
  listPanel: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: 14,
    padding: 12,
    boxShadow: theme.shadow.md,
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 32px)",
  },
  editorPanel: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 32px)",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 8px 12px",
    borderBottom: `1px solid ${theme.colors.border}`,
    marginBottom: 8,
  },
  panelTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800,
    letterSpacing: 0.2,
    color: theme.colors.text,
  },
};
