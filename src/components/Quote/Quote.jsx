import React, { useContext, useEffect, useMemo, useState } from "react";
import { TiArrowSync } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import languageCtx from "../../context/languageCtx";
import { NextChapterBtn } from "../../utils/components/Btn/NextChapterBtn";
import { getChapters, getSlokByChapter } from "../../utils/gitaApi";
import { BottomRowVerses } from "../Verses/BottomRowVerses";
import Verse from "./../Verses/Verse";
import { NavVerses } from "../Verses/TopRowVerses";
function Quote() {
  const [verse_ind, setVerse_ind] = useState(0);
  const [verses, setVerses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [swipeXVal, setSwipeXVal] = useState(0);
  const [swipeYVal, setSwipeYVal] = useState(0);
  window.chapters = chapters;
  const params = useParams();
  const langCtx = useContext(languageCtx);
  const navigate = useNavigate();

  const handleSwipe = useSwipeable({
    onSwipedUp: () => {
      nextQuote();
    },
    onSwipedLeft: () => {
      goNext();
    },
    onSwipedRight: () => {
      goPrev();
    },
    onSwiped: () => {
      setSwipeYVal(0);
      setSwipeXVal(0);
    },
    onSwiping: (e) => {
      setSwipeYVal(e.deltaY / 300);
      setSwipeXVal(e.deltaX / 150);
    },
    preventScrollOnSwipe: true,
  });
  function goPrev() {
    if (params.verse_index == 1) {
      if (params.chapter_index > 1) {
        navigate(
          `/quote/${Number(params.chapter_index) - 1}/${
            chapters[Number(params.chapter_index) - 2].verses_count
          }`
        );
      }
    } else
      navigate(
        `/quote/${params.chapter_index}/${Number(params.verse_index) - 1}`
      );
  }
  function goNext() {
    if (
      params.verse_index ==
      chapters[Number(params.chapter_index) - 1].verses_count
    )
      navigate(`/quote/${Number(params.chapter_index) + 1}/1`);
    else
      navigate(
        `/quote/${params.chapter_index}/${Number(params.verse_index) + 1}`
      );
  }
  const [ch_loading, setChLoading] = useState(false);

  const [slok_loading, setSlokLoading] = useState(false);

  useMemo(() => {
    setChLoading(true);
    setSlokLoading(true);
    getChapters()
      .then((data) => {
        setChapters(data);
        setChLoading(false);
      })
      .catch((e) => console.log(e));
    getSlokByChapter(params.chapter_index)
      .then((data) => {
        setVerses(data);
        setSlokLoading(false);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [params.chapter_index]);
  useEffect(() => {
    if (params.verse_index) {
      setVerse_ind(Number(params.verse_index) - 1);
    } else {
      if (chapters.length > 0) {
        nextQuote();
      }
    }
  }, [params, chapters]);
  function nextQuote() {
    let randomChap = Math.floor(Math.random() * (chapters.length - 1));
    console.log(randomChap);
    console.log(chapters[randomChap]);
    let randomVerse =
      Math.floor(Math.random() * (chapters[randomChap].verses_count - 1)) + 1;
    if (randomChap == Number(params.chapter_index) - 1) {
    } else {
      setVerses([]);
    }
    navigate(`/quote/${randomChap + 1}/${randomVerse}`);
  }
  return (
    <div
      className={
        "verses w-100 h-100 vstack vh-100 overflow-y-auto " +
        (ch_loading || slok_loading ? " loading pe-none " : "")
      }
    >
      <div className="d-center justify-content-between w-100">
        <div className="left w-100"></div>
        <div className="d-center w-100">
          <div className="d-center flex-column">
            <button
              className={
                "refresh btn border-0 p-0 d-center " +
                (ch_loading || slok_loading ? " loading pe-none spin " : "")
              }
              onClick={() => {
                nextQuote();
              }}
            >
              <div>
                <TiArrowSync size={"40px"} />
              </div>
            </button>
          </div>
        </div>
        <div className="w-100">
          <NavVerses />
        </div>
      </div>
      <div className="position-relative d-center flex-grow-1">
        <div
          className="placeholder position-absolute w-100 h-100 bg-theme  d-center"
          style={{
            transform:
              Math.abs(swipeXVal) > Math.abs(swipeYVal)
                ? swipeXVal < 1 && swipeXVal > 0
                  ? `translateX(${(swipeXVal - 1) * 100}%)`
                  : swipeXVal < 0
                  ? `translateX(${(1 - swipeXVal) * 100})`
                  : ``
                : swipeYVal < 1 && swipeYVal > 0
                ? `translateY(${(swipeYVal - 1) * 100}%)`
                : swipeYVal < 0
                ? `translateY(${(1 - swipeYVal) * 100})`
                : ``,
            opacity:
              Math.abs(swipeXVal) > Math.abs(swipeYVal)
                ? 2 * Math.abs(swipeXVal)
                : 2 * Math.abs(swipeYVal),
          }}
        >
          <div className="placeholder-text d-center w-100 h-100 ">
            <Verse
              verse={
                Math.abs(swipeXVal) > Math.abs(swipeYVal)
                  ? swipeXVal < 0
                    ? verses[verse_ind + 1]
                    : verses[verse_ind - 1]
                  : null
              }
              langCtx={langCtx}
              key={verse_ind}
              id={
                Math.abs(swipeXVal) > Math.abs(swipeYVal)
                  ? swipeXVal < 0
                    ? verses[verse_ind + 1]?.id
                    : verses[verse_ind - 1]?.id
                  : null
              }
            />
          </div>
        </div>
        <div
          className="d-flex  align-items-start w-100 h-100 swipe-cont"
          {...handleSwipe}
          style={{
            transform:
              Math.abs(swipeXVal) > Math.abs(swipeYVal)
                ? `translateX(${swipeXVal * 100}%)`
                : ` translateY(${swipeYVal * 100}%)`,
            opacity:
              Math.abs(swipeXVal) > Math.abs(swipeYVal)
                ? 1 - 2 * Math.abs(swipeXVal)
                : 1 - 2 * Math.abs(swipeYVal),
            filter: `blur(${
              Math.abs(swipeXVal) > Math.abs(swipeYVal)
                ? 10 * Math.abs(swipeXVal)
                : 10 * Math.abs(swipeYVal)
            }px)`,
          }}
        >
          <div className="h-100 d-center justify-content-between px-2">
            <Verse
              verse={verses[verse_ind]}
              langCtx={langCtx}
              key={verse_ind}
              id={verses[verse_ind]?.id}
            />
          </div>
        </div>
      </div>
      {params.verse_index == verses.length && params.chapter_index < 18 && (
        <div className="d-center">
          <NextChapterBtn
            link={`/quote/${Number(params.chapter_index) + 1}/1`}
          />
        </div>
      )}
      <BottomRowVerses
        langCtx={langCtx}
        url={`https://bhagavadgitakrazy.netlify.app/chapters/${
          Number(params.chapter_index) + 1
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

export default Quote;
