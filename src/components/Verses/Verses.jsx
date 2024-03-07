import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChapters, getSlokByChapter } from "../../utils/gitaApi";
import Verse from "./Verse/Verse";
import LanguageSelector from "../Chapters/Chapter/LanguageSelector";
import languageCtx from "../../context/languageCtx";
import { BottomRow } from "../Chapters/Chapter/BottomRow";
import { GiSpellBook } from "react-icons/gi";
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight, FaArrowRightArrowLeft } from "react-icons/fa6";
import Share from "../../utils/components/Share";
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
      <div className="d-flex flex-column">

      <h1>Verses in Bhagavad Gita </h1>
      <nav className="hstack justify-content-end gap-2 px-2 ">
        <Link to="/chapters" className="text-decoration-none">chapters </Link>
      </nav>
      </div>
      <div className="h-100 d-center justify-content-between px-2">
        <Verse verse={verses[verse_ind]} langCtx={langCtx} />
      </div>
      {params.verse_index == verses.length && params.chapter_index < 18 && (
        <div className="d-center">
          <Link
            to={`/chapters/${Number(params.chapter_index) + 1}/verses/`}
            className="next-chapter text-white bg-dark px-2 py-1 rounded-3 d-flex text-decoration-none align-items-center justify-content-center gap-2"
          >
            <div className="span d-none d-sm-flex">next chapter</div>
            <div className="icon book-icon">
              <FaArrowRight size={"40px"} />{" "}
            </div>
          </Link>
        </div>
      )}
      <BottomRowVerses
        langCtx={langCtx}
        url={`https://bhagavadgitakrazy.netlify.app/chapters/${
          params.chapter_index + 1
        }/verse/${params.verse_index + 1}/`}
        text={`bhagavadgita chapter-${params.chapter_index} verse-${
          params.verse_index + 1
        } says ${verses[verse_ind]?.text} \n \n ${
          verses[verse_ind]?.transliteration
        }`}
        title={"share bg" + verses[verse_ind]?.id}
        number={verse_ind}
        maxlength={verses.length}
      />
    </div>
  );
}

function BottomRowVerses({ langCtx, number, url, text, title, maxlength }) {
  const params= useParams();
  return (
    <div className="down-cont hstack justify-content-between">
      <div className="left w-100">
        <Share url={url} text={text} title={title} />
      </div>
      <div className="chapter_number center h4 user-select-none w-100 d-center">
        <div className="h-100 d-center justify-content-between gap-3">
          {number >= 1 ? (
            <Link
              className="prev  fw-bold vstack bg-transparent border-0 text-dark text-decoration-none"
              to={`${params.verse_index?`./../`:`./`}${number - 1 + 1}/`}
            >
              <div className="icon"><FaAngleLeft size={"23px"} /></div>
              <span className="opacity-50">{number - 1 + 1}</span>
            </Link>
          ) : (
            <Link className="prev display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
              x
            </Link>
          )}
          <div className="d-page-number display-3">{number + 1}</div>
          {number < maxlength - 1 ? (
            <Link
              className="next  fw-bold vstack bg-transparent border-0 text-dark text-decoration-none"
              to={`${params.verse_index?`./../`:`./`}${number + 1 + 1}/`}
            >
                 <div className="icon"><FaAngleRight size={"23px"} /></div>
              <span className="opacity-50">{number + 1 + 1}</span>
            </Link>
          ) : (
            <Link className="next display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
              x
            </Link>
          )}
        </div>
      </div>
      <div className="right d-center justify-content-end w-100 ">
        <div>
          <LanguageSelector langCtx={langCtx} />
        </div>
      </div>
    </div>
  );
}
export default Verses;
