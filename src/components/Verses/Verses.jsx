import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChapters, getSlokByChapter } from "../../utils/gitaApi";
import Verse from "./Verse/Verse";
import LanguageSelector from "../Chapters/Chapter/LanguageSelector";
import languageCtx from "../../context/languageCtx";
import { BottomRow } from "../Chapters/Chapter/BottomRow";
import { GiSpellBook } from "react-icons/gi";
import { FaArrowRight, FaArrowRightArrowLeft } from "react-icons/fa6";
function Verses() {
  const [verse_ind, setVerse_ind] = useState(0);
  const [verses, setVerses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const params = useParams();
  const langCtx = useContext(languageCtx);
  useMemo(() => {
    getChapters()
      .then((data) => {
        setChapters(data);
      })
      .catch((e) => console.log(e));
    getSlokByChapter(params.chapter_index)
      .then((data) => {
        setVerses(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (params.verse_index) {
      setVerse_ind(Number(params.verse_index) - 1);
    }
  }, [params]);
  return (
    <div className="verses w-100 h-100 vstack">
      <h1>Verses in Bhagavad Gita </h1>
      <div className="h-100 d-center justify-content-between">
        {verse_ind >= 1 ? (
          <Link
            className="prev display-1 fw-bold bg-transparent border-0 text-dark text-decoration-none"
            to={`./../${verse_ind - 1 + 1}/`}
          >
            {verse_ind - 1 + 1}
          </Link>
        ) : (
          <Link className="prev display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            x
          </Link>
        )}
        <Verse verse={verses[verse_ind]} langCtx={langCtx} />

        {verse_ind < verses.length - 1 ? (
          <Link
            className="next display-1 fw-bold bg-transparent border-0 text-dark text-decoration-none"
            to={`./../${verse_ind + 1 + 1}/`}
          >
            {verse_ind + 1 + 1}
          </Link>
        ) : (
          <Link className="next display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            x
          </Link>
        )}
      </div>
      {params.verse_index == verses.length - 1 && params.chapter_index < 18 && (
        <div className="d-center">
          <Link
            to={`/chapter/${Number(params.chapter_index) + 1}/verses/`}
            className="next-chapter text-white bg-dark px-2 py-1 rounded-3 d-flex text-decoration-none align-items-center justify-content-center gap-2"
          >
            <div className="span d-none d-sm-flex">next chapter</div>
            <div className="icon book-icon">
              <FaArrowRight size={"40px"} />{" "}
            </div>
          </Link>
        </div>
      )}
      <BottomRow
        langCtx={langCtx}
        url={`https://bhagavadgitakrazy.netlify.app/chapter/${
          params.chapter_index + 1
        }/verse/${params.verse_index + 1}/`}
        text={`bhagavadgita chapter-${params.chapter_index} verse-${
          params.verse_index + 1
        } says ${verses[verse_ind]?.text} \n \n ${
          verses[verse_ind]?.transliteration
        }`}
        title={"share bg" + verses[verse_ind]?.id}
        number={verse_ind + 1}
      />
    </div>
  );
}

export default Verses;
