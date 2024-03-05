import React, { useMemo, useState } from "react";
import { getChapter, getSlokByChapter } from "../../utils/gitaApi";
import { useParams } from "react-router-dom";
import Verse from "./Verse/Verse";
function Verses() {
  const [verse_ind, setVerse_ind] = useState(0);
  const [verses, setVerses] = useState([]);
  const params = useParams();
  useMemo(() => {
    getSlokByChapter(params.chapter_index)
      .then((data) => {
        setVerses(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="verses w-100 h-100 d-center">
      <h1>Verses in Bhagavad Gita </h1>
      <div className="h-100 d-center ">
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
        <Verse verse={verses[verse_ind]} />

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
    </div>
  );
}

export default Verses;
