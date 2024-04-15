import "bootstrap/dist/css/bootstrap.min.css";
import React, {
  Suspense,
  createContext,
  lazy,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./fonts.css";
import "./theme.css";
import languageCtx from "./context/languageCtx";
// Components for each route
const Welcome = lazy(() => import("./components/Welcome"));
const Time = lazy(() => import("./components/Time"));
const Quote = lazy(() => import("./components/Quote"));
const Krishna = lazy(() => import("./components/Krishna"));
const Arjuna = lazy(() => import("./components/Arjuna"));
const Background = lazy(() => import("./components/Background"));
const Credits = lazy(() => import("./components/Credits"));
const Chapter = lazy(() => import("./components/Chapters/Chapter"));
const Chapters = lazy(() => import("./components/Chapters"));
const SiteMap = lazy(() => import("./components/SiteMap"));
const LoadMap = lazy(() => import("./components/LoadMap"));
const Verses = lazy(() => import("./components/Verses"));
const Query = lazy(() => import("./components/Query"));
const Search = lazy(() => import("./components/Search"));

const themeCtx = createContext({ theme: "auto", setTheme: () => {} });
function App() {
  const [language, setLanguage] = useState("english");
  const themes = ["light", "dark", "blue", "auto"];
  const [theme, _setTheme] = useReducer((state, action) => {
    return action;
  }, "auto");
  function setTheme(theme) {
    _setTheme(theme);
    setThemeCookies("theme", theme);
  }

  const [themeCookies, setThemeCookies] = useCookies(["theme"]);

  useEffect(() => {
    console.log(themeCookies);
    if (themeCookies.theme) _setTheme(themeCookies.theme);
  }, [themeCookies]);

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
              <Suspense fallback={<div className="w-100 h-100 d-center">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/sitemap" element={<SiteMap />} />
                <Route path="/loadmap" element={<LoadMap />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:query" element={<Query />} />
                <Route path="/time" element={<Time />} />
                <Route path="/quote">
                  <Route path="" element={<Quote />} />
                  <Route
                    path=":chapter_index/:verse_index"
                    element={<Quote />}
                  />
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
              </Suspense>
          </Router>
        </main>
      </themeCtx.Provider>
    </languageCtx.Provider>
  );
}

export default App;
export { themeCtx };
