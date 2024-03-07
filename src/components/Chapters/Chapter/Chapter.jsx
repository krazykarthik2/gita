import React, { useContext, useMemo, useState } from "react";
import { getChapter } from "../../../utils/gitaApi";
import languageCtx from "../../../context/languageCtx";
import { Link, useParams } from "react-router-dom";
import "./Chapter.css";
import { FaBook, FaSpinner } from "react-icons/fa6";
import { GiSpellBook } from "react-icons/gi";
import { BottomRow } from "./BottomRow";
import { Load ,ContentLoad} from "../../../utils/components/Loaders";
function Chapter({ chapter_index }) {
  const [chapter, setChapter] = useState({}); 
  const langCtx = useContext(languageCtx);
  const params  = useParams();
  useMemo(() => {
    getChapter(chapter_index)
      .then((data) => {
        console.log(data);
        setChapter(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="chapter-cont h-100 vstack justify-content-between pt-2 ">
      <div className="hstack justify-content-between info-main flex-wrap gap-2">
        <div className="d-flex flex-column text-nowrap">
          <div className="name h2 m-0 fw-bold"><ContentLoad value={chapter.name} lorem_count={1} /></div>
          <div className="name_transliterated  fw-bold ">
           <ContentLoad value={chapter.name_transliterated} lorem_count={2}/>
          </div>
        </div>
        <div className="name_meaning text-end "><ContentLoad value={chapter.name_meaning} lorem_count={3}/></div>
      </div>
      <div className="mid-section h-100 d-flex flex-column justify-content-between">
        <div className="description h-100 justify-content-evenly ps-3 flex-wrap flex-shrink-1 d-flex flex-column">
          <div className="hstack justify-content-between">
            <div className="name_translated h2">
              <ContentLoad value={chapter.name_translated} lorem_count={25} />
            </div>
            <div className="stats hstack justify-content-between">
              <div className="verses_count d-center flex-column">
                <div className="count display-4 ">
                  <Load value={chapter.verses_count} />
                </div>
                <div className="label">verses</div>
              </div>
            </div>
          </div>
          {langCtx.language == "english" ? (
            <div className="chapter_summary overflow-y-auto english">
              <ContentLoad value={chapter.chapter_summary} lorem_count={40}/>
            </div>
          ) : (
            <div className="chapter_summary overflow-y-auto hindi">
              <ContentLoad value={chapter.chapter_summary_hindi} lorem_count={40}/>
            </div>
          )}
        </div>
        <div className="mid-down d-center">
          <Link
            className="d-center text-decoration-none text-white bg-dark rounded-2 px-2 py-1"
            to={`/chapters/${chapter.id||params.chapter_index }/verses`}
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
      
    </div>
  );
}

export default Chapter;
