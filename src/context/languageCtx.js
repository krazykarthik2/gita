import { createContext } from "react";

const languageCtx = createContext({
  language: "english",
  setLanguage: () => {},
});

export default languageCtx;
