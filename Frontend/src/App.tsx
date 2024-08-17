import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/presentations/:title" element={<PresentationPreview />} />
        <Route path="/create" element={<CreatePresentation />} />
        <Route path="**" element={<pageNotFound/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
