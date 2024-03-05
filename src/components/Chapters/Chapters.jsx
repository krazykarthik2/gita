import React, { useEffect, useMemo } from "react";
import { Link, useMatch, useParams } from "react-router-dom";
import { getChapters } from "../../utils/gitaApi";
import Chapter from "./Chapter";
function Chapters() {
  const [chapters, setChapters] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
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
      <div className="d-flex flex-column w-100 px-3 pt-2">
        <div className="heading h1">Chapters</div>
        <div className="number">
          There are {chapters.length} chapters in Bhagavad Gita
        </div>
      </div>
      <div className="h-100 d-center ">
        {currentIndex >= 1 ? (
          <Link
            to={`/chapter/${currentIndex}`}
            className="prev display-1 fw-bold bg-transparent border-0 text-decoration-none text-dark"
          >
            {currentIndex}
          </Link>
        ) : (
          <button className="prev display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            x
          </button>
        )}
        <Chapter key={currentIndex} chapter_index={currentIndex} />

        {currentIndex < chapters.length - 1 ? (
          <Link
            className="next display-1 fw-bold bg-transparent border-0 text-decoration-none text-dark"
            to={`/chapter/${currentIndex + 2}`}
          >
            {currentIndex + 2}
          </Link>
        ) : (
          <button className="next display-1 fw-bold bg-transparent border-0 font-redacted opacity-50">
            x
          </button>
        )}
      </div>
    </div>
  );
}

export default Chapters;
