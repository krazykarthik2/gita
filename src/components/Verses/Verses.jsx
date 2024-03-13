import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import languageCtx from "../../context/languageCtx";
import { NextChapterBtn } from "../../utils/components/Btn/NextChapterBtn";
import { getChapters, getSlokByChapter } from "../../utils/gitaApi";
import { BottomRowVerses } from "./BottomRowVerses";
import { TopRowVerses } from "./TopRowVerses";
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
          <NextChapterBtn
            link={`/chapters/${Number(params.chapter_index) + 1}/verses/`}
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

export default Verses;
