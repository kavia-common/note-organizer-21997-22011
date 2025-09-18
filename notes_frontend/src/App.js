import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { NotesProvider } from "./context/NotesContext";

/**
 * PUBLIC_INTERFACE
 * App: Entry point rendering the Ocean Professional notes layout with state provider.
 */
function App() {
  return (
    <NotesProvider>
      <Layout />
    </NotesProvider>
  );
}

export default App;
