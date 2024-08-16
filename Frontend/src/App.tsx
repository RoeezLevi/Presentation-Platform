import "./App.css";
import FetchPresentations from "./components/fetchPresentations";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FetchPresentations />} />
        <Route path="/presentations/:title" element={<PresentationPreview />} />
        <Route path="/create" element={<CreatePresentation />} />
        <Route path="**" element={<pageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
