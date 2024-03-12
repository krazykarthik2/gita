import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaMapSigns } from "react-icons/fa";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowRight,
  FaBook,
  FaMap,
} from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import languageCtx from "../../context/languageCtx";
import { themeCtx as themeContext } from "../../App";
import Share from "../../utils/components/Share";
import { getChapters, getSlokByChapter } from "../../utils/gitaApi";
import LanguageSelector from "../Chapters/Chapter/LanguageSelector";
import Verse from "./Verse/Verse";

function Verses() {
  const [verse_ind, setVerse_ind] = useState(0);
  const [verses, setVerses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const params = useParams();
  const langCtx = useContext(languageCtx);

  function getSlokOfCurrentChapter() {
    setVerses([]);
    setVerse_ind(0);
    getSlokByChapter(params.chapter_index)
      .then((data) => {
        setVerses(data);
      })
      .catch((error) => console.error(error));
  }
  useMemo(() => {
    getChapters()
      .then((data) => {
        setChapters(data);
      })
      .catch((e) => console.log(e));
    getSlokOfCurrentChapter();
  }, []);

  useEffect(() => {
    if (params.chapter_index) {
      getSlokOfCurrentChapter();
    }
    if (params.verse_index) {
      setVerse_ind(Number(params.verse_index) - 1);
    }
  }, [params]);
  return (
    <div className="verses w-100 h-100 vstack">
      <TopRowVerses heading={"Chapter " + params.chapter_index + ""} />
      <div className="h-100 d-center px-2">
        <Verse
          verse={verses[verse_ind]}
          langCtx={langCtx}
          id={verses[verse_ind]?.id || ""}
        />
      </div>
      {params.verse_index == verses.length && params.chapter_index < 18 && (
        <div className="d-center">
          <Link
            to={`/chapters/${Number(params.chapter_index) + 1}/verses/`}
            className="next-chapter px-2 py-2 rounded-3 text-decoration-none d-center action-btn  gap-2"
          >
            <div className="span d-none d-sm-flex h3 align-self-center align-items-center m-0">
              next chapter
            </div>
            <div className="icon book-icon d-center">
              <FaArrowRight size={"1.2em"} />{" "}
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

function TopRowVerses({ heading }) {
  return (
    <div className="d-flex flex-column  px-4 pt-1">
      <h1 className="user-select-none">{heading}</h1>
      <nav className="hstack justify-content-end gap-2 px-2 user-select-none">
        <Link
          to="/loadmap"
          className="text-decoration-none d-center flex-column text-color"
        >
          <div className="icon">
            <FaMap size={"20px"} />
          </div>
          <div className="text font-px-16">loadmap </div>
        </Link>
        <Link
          to="/sitemap"
          className="text-decoration-none d-center flex-column text-color"
        >
          <div className="icon">
            <FaMapSigns size={"20px"} />
          </div>
          <div className="text font-px-16">sitemap </div>
        </Link>
        <Link
          to="/chapters"
          className="text-decoration-none d-center flex-column text-color"
        >
          <div className="icon">
            <FaBook size={"20px"} />
          </div>
          <div className="text font-px-16">chapters </div>
        </Link>
      </nav>
    </div>
  );
}

function BottomRowVerses({
  langCtx,
  number,
  url,
  text,
  title,
  maxlength,
}) {
  const params = useParams();
  return (
    <div className="down-cont hstack justify-content-between">
      <div className="left w-100">
        <Share url={url} text={text} title={title} />
      </div>
      <div className="chapter_number center h4 user-select-none w-100 d-center">
        <div className="h-100 d-center justify-content-between gap-sm-3">
          {number >= 1 ? (
            <Link
              className="prev  fw-bold hstack bg-transparent border-0 text-color text-decoration-none"
              to={`${params.verse_index ? `./../` : `./`}${number - 1 + 1}/`}
            >
              <span className="opacity-25 d-none d-sm-flex">
                {number - 1 + 1}
              </span>
              <div className="icon">
                <FaAngleLeft size={"2em"} />
              </div>
            </Link>
          ) : (
            <Link className="prev  fw-bold hstack bg-transparent border-0 text-color text-decoration-none opacity-50 gap-4 me-2">
              <span className="opacity-25 font-redacted  d-none d-sm-flex">
                x
              </span>
              <div className="icon ">
                <div className="font-redacted " style={{ fontSize: "2em" }}>
                  x
                </div>
              </div>
            </Link>
          )}
          <div className="d-page-number display-3">{number + 1}</div>
          {number < maxlength - 1 ? (
            <Link
              className="next  fw-bold hstack bg-transparent border-0 text-color text-decoration-none"
              to={`${params.verse_index ? `./../` : `./`}${number + 1 + 1}/`}
            >
              <div className="icon">
                <FaAngleRight size={"2em"} />
              </div>
              <span className="opacity-25 d-none d-sm-flex">
                {number + 1 + 1}
              </span>
            </Link>
          ) : (
            <Link className="next  fw-bold hstack bg-transparent border-0 text-color text-decoration-none opacity-50 gap-4 me-2">
              <div className="icon ">
                <div className="font-redacted " style={{ fontSize: "2em" }}>
                  x
                </div>
              </div>
              <span className="opacity-25 font-redacted  d-none d-sm-flex">
                x
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="right d-center justify-content-end w-100 flex-wrap ">
        {" "}
        <div className="act theme d-center">
          <ThemeSelector />
        </div>
        <div className="lang d-center">
          <LanguageSelector langCtx={langCtx} />
        </div>
      </div>
    </div>
  );
}
export { TopRowVerses };
export default Verses;
function ThemeSelector() {
  const themeCtx = useContext(themeContext);

  function nextTheme() {
    themeCtx.setTheme(
      themeCtx.themes[
        (themeCtx.themes.findIndex((theme) => theme == themeCtx.theme) + 1) %
          themeCtx.themes.length
      ]
    );
  }
  return (
    <button
      className="action-btn border-0 rounded-3 p-2"
      onClick={() => nextTheme()}
    >
      <IoIosColorPalette size={"2em"} />
    </button>
  );
}
