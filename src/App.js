import React, { createContext, useEffect, useReducer } from "react";
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
import SiteMap from "./components/SiteMap";
import LoadMap from "./components/LoadMap";
import languageCtx from "./context/languageCtx";
import Verses from "./components/Verses";
import Query from "./components/Query";
import Search from "./components/Search";
import "./theme.css";

import { useCookies } from "react-cookie";
const themeCtx = createContext({ theme: "auto", setTheme: () => {} });
function App() {
  const [language, setLanguage] = React.useState("english");
  const themes = ["light", "dark", "blue", "auto"];
  const [theme, _setTheme] = useReducer((state, action) => {
    return action;
  }, "auto");
  function setTheme(theme) {
    _setTheme(theme);
    setThemeCookies({ theme });
  }

  const [themeCookies, setThemeCookies] = useCookies(["theme"]);

  useEffect(() => {
    setTheme(themeCookies.theme || "auto");
  }, [themeCookies.theme]);

  function handleAuto(theme) {
    if (theme === "auto") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      } else {
        return "light";
      }
    }
    return theme;
  }

  return (
    <languageCtx.Provider value={{ language, setLanguage }}>
      <themeCtx.Provider value={{ theme, themes, setTheme }}>
        <main
          id="react-path-container"
          className={
            "bg-theme text-color h-100 min-height-vh-100 theme-" +
            handleAuto(theme)
          }
        >
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/sitemap" element={<SiteMap />} />
              <Route path="/loadmap" element={<LoadMap />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:query" element={<Query />} />
              <Route path="/time" element={<Time />} />
              <Route path="/quote">
                <Route path="" element={<Quote />} />
                <Route path=":chapter_index/:verse_index" element={<Quote />} />
              </Route>
              <Route path="/chapters">
                <Route path="" element={<Chapters />} />
                <Route path=":chapter_index">
                  <Route path="" element={<Chapters />} />
                  <Route path="verses">
                    <Route path="" element={<Verses />} />
                    <Route path=":verse_index" element={<Verses />} />
                  </Route>
                </Route>
              </Route>

              <Route path="/krishna" element={<Krishna />} />
              <Route path="/arjuna" element={<Arjuna />} />
              <Route path="/background" element={<Background />} />
              <Route path="/credits" element={<Credits />} />
            </Routes>
          </Router>
        </main>
      </themeCtx.Provider>
    </languageCtx.Provider>
  );
}

export default App;
export { themeCtx };
