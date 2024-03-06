import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getSlokByChapter } from "../../utils/gitaApi";
import Verse from "./Verse/Verse";
import LanguageSelector from "../Chapters/Chapter/LanguageSelector";
import languageCtx from "../../context/languageCtx";
function Verses() {
  const [verse_ind, setVerse_ind] = useState(0);
  const [verses, setVerses] = useState([]);
  const params = useParams();
  const langCtx = useContext(languageCtx);
  useMemo(() => {
    getSlokByChapter(params.chapter_index)
      .then((data) => {
        setVerses(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="verses w-100 h-100 vstack">
      <h1>Verses in Bhagavad Gita </h1>
      <div className="h-100 d-center justify-content-between">
        {verse_ind > 1 ? (
          <button
            className="prev display-1 fw-bold bg-transparent border-0"
            onClick={() => {
              setVerse_ind((e) => e - 1);
            }}
          >
            {verse_ind - 1}
          </button>
        ) : (
          <button className="prev display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            x
          </button>
        )}
        <Verse verse={verses[verse_ind]} langCtx={langCtx} />

        {verse_ind < verses.length ? (
          <button
            className="next display-1 fw-bold bg-transparent border-0"
            onClick={() => {
              setVerse_ind((e) => e + 1);
            }}
          >
            {verse_ind + 1}
          </button>
        ) : (
          <button className="next display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            x
          </button>
        )}
      </div>
      <div className="d-center w-100">
        <LanguageSelector langCtx={langCtx} />
      </div>
    </div>
  );
}

export default Verses;
