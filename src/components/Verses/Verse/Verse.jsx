import React, { useEffect, useState } from "react";
import { ContentLoad, Load } from "../../../utils/components/Loaders";
function TranslationVerse({ translation }) {
  window.translation = translation;
  return (
    <div className="translation-verse">
      <div className="translation-description text-decoration-underline">
        <ContentLoad value={translation?.description} lorem_count={12} />
      </div>
      <div className="hstack justify-content-between">
        <div className="translation-id fw-bold text-gray hstack user-select-none">
          <div className="prefix">translate#</div>
          <ContentLoad value={translation?.id} lorem_count={1} />
        </div>
        <div className="translation-author hstack">
          <div className="prefix">~</div>
          <ContentLoad value={translation?.author_name} lorem_count={1} />
        </div>
      </div>
    </div>
  );
}
function Verse({ verse, langCtx }) {
  window.verse = verse;
  const [randomTranslation, setRandomTranslation] = useState(0);
  const [translationsInLang, setTranslationsInLang] = useState([]);
  useEffect(() => {
    if (verse)
      if (verse.translations)
        setTranslationsInLang(
          verse?.translations.filter((e) => e.language == langCtx.language)
        );
  }, [verse, langCtx]);
  useEffect(() => {
    if (verse)
      if (verse.translations)
        setRandomTranslation(
          Math.floor(Math.random() * (translationsInLang.length - 1)) + 1
        );
  }, [verse]);
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
        <div className="id text-gray fw-bold user-select-none">
          <ContentLoad value={verse?.id} lorem_count={2} />{" "}
        </div>
      </div>
      {/* <div className="commentaries">{verse?.commentaries}</div> */}
      <div className="d-flex flex-column fw-bold ">
        <div className="text h2 font-Amita vstack gap-2">
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

      <div className="translation-random">
        <TranslationVerse translation={translationsInLang[randomTranslation]} />
      </div>
      {/* <div className="verse_number">{verse?.verse_number}</div> */}
      <div className="slug user-select-none">
        <ContentLoad value={verse?.slug} lorem_count={3} />
      </div>
    </div>
  );
}

export default Verse;
