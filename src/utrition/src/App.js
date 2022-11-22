import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar";
import Profile from "./pages/profile_page";
import Upload from "./pages/upload_page";
import Home from "./pages";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
