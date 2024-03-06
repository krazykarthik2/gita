import React, { useContext, useMemo, useState } from "react";
import { getChapter } from "../../../utils/gitaApi";
import languageCtx from "../../../context/languageCtx";
import Share from "../../../utils/components/Share";
import { Link, useParams } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

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
    <div className="chapter-cont h-100 d-flex flex-column justify-content-between pt-2 pb-4">
      <div className="hstack justify-content-between info-main">
        <div className="d-flex flex-column">
          <div className="name h2">{chapter.name}</div>
          <div className="name_transliterated text-end ">
            {chapter.name_transliterated}
          </div>
        </div>
        <div className="name_meaning ">{chapter.name_meaning}</div>
      </div>
      <div className="mid-section">
        <div className="description ps-3 flex-wrap flex-shrink-1 d-flex flex-column">
          <div className="name_translated h2">{chapter.name_translated}</div>

          {langCtx.language == "english" ? (
            <div className="chapter_summary ">{chapter.chapter_summary}</div>
          ) : (
            <div className="chapter_summary_hindi">
              {chapter.chapter_summary_hindi}
            </div>
          )}
        </div>
        <div className="mid-down d-center">
          <Link className="d-center" to={`/chapter/${chapter.id}/verses`}>
            read verses
          </Link>
        </div>
      </div>

      <div className="stats hstack justify-content-between">
        <div className="slug text-gray">{chapter.slug}</div>
        <div className="verses_count d-center gap-2">
          <div className="label">verses</div>
          <div className="count">{chapter.verses_count}</div>
        </div>
      </div>
      <div className="hstack justify-content-between">
        <div className="left">
          <Share
            url={
              "https://www.bhagavadgitakrazy.netlify.app/chapter/" + chapter.id
            }
            text={"Share bhagavad gita " + chapter.name + " "}
          />
        </div>
        <div className="center d-center flex-column ">
          <LanguageSelector langCtx={langCtx} /> 
          <div className="chapter_number h4 user-select-none">
            {chapter.chapter_number}
          </div>
        </div>
        <div className="id">id:{chapter.id}</div>
      </div>
    </div>
  );
}

export default Chapter;
