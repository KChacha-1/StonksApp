import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from"./pages/Details"
import SearchResults from "./pages/SearchResults"

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults/>}/>
          <Route path="/details" element={<Details/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
