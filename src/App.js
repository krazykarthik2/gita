import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Components for each route
import Welcome from "./components/Welcome";
import Time from "./components/Time";
import Quote from "./components/Quote";
import Krishna from "./components/Krishna";
import Arjuna from "./components/Arjuna";
import Background from "./components/Background";
import Credits from "./components/Credits";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/time" element={<Time />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/krishna" element={<Krishna />} />
        <Route path="/arjuna" element={<Arjuna />} />
        <Route path="/background" element={<Background />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </Router>
  );
}

export default App;
