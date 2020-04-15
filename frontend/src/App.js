import React from "react";
import "../node_modules/bulma/css/bulma.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <Router>
      <AppLayout><Routes /></AppLayout>
    </Router>
  );
}

export default App;
