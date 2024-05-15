import React, { useEffect, useMemo, useState } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import { getChapters } from "../../utils/gitaApi";
import Chapter from "./Chapter";
import BottomRowChapters from "./BottomRowChapters";
import { FaMap } from "react-icons/fa6";
import { useSwipeable } from "react-swipeable";
function Chapters() {
  const [chapters, setChapters] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  window.chapters = chapters;
  const params = useParams();
  const navigate = useNavigate();
  const [swipeXval, setSwipeXVal] = useState(0);
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

  const handleSwipe = useSwipeable({
    onSwipedLeft: () => {
      goNext();
    },
    onSwipedRight: () => {
      goPrev();
    },
    onSwiped: () => {
      setSwipeXVal(0);
    },
    onSwiping: (e) => {
      console.log(e.event.target);
      setSwipeXVal(e.deltaX / e.event.target?.clientWidth);
    },
    preventScrollOnSwipe: true,
  });

  function goNext() {
    if (currentIndex < chapters.length - 1) {
      console.log("gone next");

      navigate(`/chapters/${currentIndex + 2}`);
      setTimeout(() => {
        setSwipeXVal(1.2);
        setTimeout(() => {
          setSwipeXVal(0);
        }, 100);
      }, 0);
    }
  }
  function goPrev() {
    if (currentIndex >= 1) {
      console.log("gone next");

      navigate(`/chapters/${currentIndex}`);
      setTimeout(() => {
        setSwipeXVal(-1);
        setTimeout(() => {
          setSwipeXVal(0);
        }, 100);
      }, 0);
    }
  }

  return (
    <div className="chapters-screen w-100 d-center flex-column h-100">
      <div className="d-center justify-content-between w-100 px-3 pt-2">
        <div className="heading h1">Chapters</div>
        <Link className="center text-color " to={"/sitemap"}>
          <FaMap size={"2em"} />
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
        <div
          className="swipe-area hstack justify-content-center gap-3 p-1"
          {...handleSwipe}
          style={{
            transform: `translateX(${swipeXval * 100}%)`,
            transition: `all ${swipeXval == 0 ? 0.2 : 0}s ease-in`,
          }}
        >
          <Chapter key={currentIndex} chapter_index={currentIndex} />
        </div>

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
      <BottomRowChapters
        currentIndex={currentIndex}
        chapter={chapters[currentIndex]}
      />
    </div>
  );
}
export default Chapters;
