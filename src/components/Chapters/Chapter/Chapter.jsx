import React, { useContext, useMemo, useState } from "react";
import { getChapter } from "../../../utils/gitaApi";
import languageCtx from "../../../context/languageCtx";
import { Link, useParams } from "react-router-dom";
import "./Chapter.css";
import { FaBook } from "react-icons/fa6";
import { GiSpellBook } from "react-icons/gi";
import { BottomRow } from "./BottomRow";
function Chapter({ chapter_index }) {
  const [chapter, setChapter] = useState({});
  const langCtx = useContext(languageCtx);
  useMemo(() => {
    getChapter(chapter_index)
      .then((data) => {
        console.log(data);
        setChapter(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="chapter-cont h-100 d-flex flex-column justify-content-between pt-2 ">
      <div className="hstack justify-content-between info-main flex-wrap gap-2">
        <div className="d-flex flex-column text-nowrap">
          <div className="name h2 m-0 fw-bold">{chapter.name}</div>
          <div className="name_transliterated  fw-bold ">
            {chapter.name_transliterated}
          </div>
        </div>
        <div className="name_meaning text-end ">{chapter.name_meaning}</div>
      </div>
      <div className="mid-section h-100 d-flex flex-column justify-content-between">
        <div className="description h-100 justify-content-evenly ps-3 flex-wrap flex-shrink-1 d-flex flex-column">
          <div className="hstack justify-content-between">
            <div className="name_translated h2">{chapter.name_translated}</div>
            <div className="stats hstack justify-content-between">
              <div className="verses_count d-center flex-column">
                <div className="count display-4 ">{chapter.verses_count}</div>
                <div className="label">verses</div>
              </div>
            </div>
          </div>
          {langCtx.language == "english" ? (
            <div className="chapter_summary overflow-y-auto english">
              {chapter.chapter_summary}
            </div>
          ) : (
            <div className="chapter_summary overflow-y-auto hindi">
              {chapter.chapter_summary_hindi}
            </div>
          )}
        </div>
        <div className="mid-down d-center">
          <Link
            className="d-center text-decoration-none text-white bg-dark rounded-2 px-2 py-1"
            to={`/chapter/${chapter.id}/verses`}
          >
            <div className="icon book-icon">
              <GiSpellBook />
            </div>
            <div className="text d-none d-sm-flex">
              read verses of {chapter.name_transliterated}
            </div>
          </Link>
        </div>
      </div>
      <div className="bottom-cont d-flex flex-column">
        <BottomRow
          langCtx={langCtx}
          number={chapter.chapter_number}
          text={"Share bhagavad gita " + chapter.name + " "}
          url={
            "https://www.bhagavadgitakrazy.netlify.app/chapter/" + chapter.id
          }
        />
        <div className="id-cont hstack w-100 justify-content-between d-none">
          <div className="slug text-gray">{chapter.slug}</div>
          <div className="id d-flex justify-content-end">
            <div className="text-muted pe-none">id:{chapter.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
