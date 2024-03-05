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
import Chapter from "./components/Chapters/Chapter";
import Chapters from "./components/Chapters";
import SiteMap from "./components/SiteMap/SiteMap";
import languageCtx from "./context/languageCtx";
import Verses from "./components/Verses/Verses";
function App() {
  const [language, setLanguage] = React.useState("english");

  return (
    <languageCtx.Provider value={{ language, setLanguage }}>
    <Router>
      <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/time" element={<Time />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapter/:chapter_index">
          <Route path="" element={<Chapters />} />
          <Route path="verses" element={<Verses />} />
        </Route>

        <Route path="/krishna" element={<Krishna />} />
        <Route path="/arjuna" element={<Arjuna />} />
        <Route path="/background" element={<Background />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </Router>
    </languageCtx.Provider>
  );
}

export default App;
