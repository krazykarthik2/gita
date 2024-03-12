import React, { useEffect, useMemo } from "react";
import { Link, useMatch, useParams } from "react-router-dom";
import { getChapters } from "../../utils/gitaApi";
import Chapter from "./Chapter";
import BottomRowChapters from "./BottomRowChapters"
import { FaMap } from "react-icons/fa6";
function Chapters() {
  const [chapters, setChapters] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  window.chapters = chapters;
  const params = useParams();
  useEffect(() => {
    if (params.chapter_index) {
      setCurrentIndex(Number(params.chapter_index) - 1);
    }
    console.log(params.chapter_index);
  }, [params]);

  useMemo(() => {
    getChapters()
      .then((data) => {
        console.log(data);
        setChapters(data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="chapters-screen w-100 d-center flex-column h-100">
      <div className="d-center justify-content-between w-100 px-3 pt-2">
        <div className="heading h1">Chapters</div>
        <Link className="center" to={"/sitemap"}>
          <FaMap />
        </Link>
        <div className="number display-1">{chapters.length}</div>
      </div>
      <div className="h-100 d-center w-100">
        {currentIndex >= 1 ? (
          <Link
            to={`/chapters/${currentIndex}`}
            className="prev display-1 fw-bold bg-transparent border-0 text-decoration-none text-color opacity-50 font-Neue"
          >
            {currentIndex}
          </Link>
        ) : (
          <button className="prev display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            *
          </button>
        )}
        <Chapter key={currentIndex} chapter_index={currentIndex} />

        {currentIndex < chapters.length - 1 ? (
          <Link
            className="next display-1 fw-bold bg-transparent border-0 text-decoration-none text-color opacity-50 font-Neue"
            to={`/chapters/${currentIndex + 2}`}
          >
            {currentIndex + 2}
          </Link>
        ) : (
          <button className="next display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            *
          </button>
        )}
      </div>
      <BottomRowChapters  currentIndex={currentIndex} chapter={chapters[currentIndex]}/>
    </div>
  );
}
export default Chapters;
