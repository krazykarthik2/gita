import React, { useEffect, useState } from "react";
import { ContentLoad, Load } from "../../../utils/components/Loaders";
import { ButtonToolbar } from "react-bootstrap";
import { FaRedo } from "react-icons/fa";
function TranslationVerse({
  translation,
  reload = function () { },
  totalCount = 1,
}) {
  window.translation = translation;
  return (
    <div className="translation-verse">
      <div className="translation-description ">
        <ContentLoad value={translation?.description} lorem_count={12} />
      </div>
      <div className="hstack justify-content-between">
        <div className="d-center">
          {totalCount > 1 && (
            <button className="btn border-0 " onClick={() => reload()}>
              <FaRedo />
            </button>
          )}
          <div className="translation-id un-need hstack user-select-none">
            <div className="prefix">translate#</div>
            <ContentLoad value={translation?.id} lorem_count={1} />
          </div>
        </div>

        <div className="translation-author hstack">
          <div className="prefix">~</div>
          <ContentLoad value={translation?.author_name} lorem_count={1} />
        </div>
      </div>
    </div>
  );
}
function Verse({ verse, langCtx, id }) {
  window.verse = verse;
  const [currTranslation, setCurrTranslation] = useState(0);
  const [translationsInLang, setTranslationsInLang] = useState([]);
  const [randomizeTrx, setRandomizeTrx] = useState(false);
  useEffect(
    (e) => {
      if (verse)
        if (verse.translations)
          setTranslationsInLang(
            verse?.translations.filter((e) => e.language == langCtx.language)
          );
    },
    [id, langCtx]
  );
  useEffect(() => {
    if (verse) if (verse.translations) setCurrTranslation(0);
  }, [translationsInLang, langCtx]);
  useEffect(() => {
    if (verse)
      if (verse.translations)
        setCurrTranslation((e) => (e + 1) % translationsInLang.length);
  }, [randomizeTrx]);
  return (
    <div className="verse-cont">
      <div className="hstack justify-content-between">
        <div className="d-flex">
          <span className="prefix">BG.</span>
          <span className="chapter_number">
            <Load value={verse?.chapter_number} />
          </span>
          <span className="sep">.</span>
          <span className="verse_number">
            <Load value={verse?.verse_number} />
          </span>
        </div>
        <div className="id un-need user-select-none">
          <ContentLoad value={verse?.id} lorem_count={2} />{" "}
        </div>
      </div>
      {/* <div className="commentaries">{verse?.commentaries}</div> */}
      <div className="d-flex flex-column fw-bold ">
        <div className="text h2 font-theme vstack gap-2">
          <div className="verse-line verse-line-1 hstack">
            <span className="content-sanskrit">
              <ContentLoad value={verse?.text.split("।")[0]} lorem_count={10} />{" "}
            </span>
            <span className="seperator">|</span>
          </div>
          <div className="verse-line verse-line-2 hstack">
            <span className="content-sanskrit">
              <ContentLoad value={verse?.text.split("।")[1]} lorem_count={10} />
            </span>
            <span className="seperator">||</span>
          </div>
        </div>

        <div className="transliteration h5">
          <ContentLoad value={verse?.transliteration} lorem_count={10} />{" "}
        </div>
      </div>
      {/*       
      <div className="word_meanings">
        {verse?.word_meanings.split(";").map((e,i) => (
          <div key={i}>{e}</div>
        ))}
      </div> */}
      <hr style={{ '--i': '10px' }} />
      <div className="translation-random">
        <TranslationVerse
          translation={translationsInLang[currTranslation]}
          reload={() => setRandomizeTrx(Math.random())}
          totalCount={translationsInLang.length}
        />
      </div>
      {/* <div className="verse_number">{verse?.verse_number}</div> */}
      <div className="slug user-select-none">
        <ContentLoad value={verse?.slug} lorem_count={3} />
      </div>
    </div>
  );
}

export default Verse;
