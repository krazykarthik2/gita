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
        <div className="translation-id fw-bold text-gray hstack">
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
          <div className="prefix">BG.</div>
          <div className="chapter_number">
            <Load value={verse?.chapter_number} />
          </div>
          <div className="sep">.</div>
          <div className="verse_number">
            <Load value={verse?.verse_number} />
          </div>
        </div>
        <div className="id text-gray fw-bold pe-none">
          <ContentLoad value={verse?.id} lorem_count={2} />{" "}
        </div>
      </div>
      {/* <div className="commentaries">{verse?.commentaries}</div> */}
      <div className="d-flex flex-column fw-bold ">
        <div className="text h2">
          <ContentLoad value={verse?.text} lorem_count={10} />
        </div>
        <div className="transliteration h3">
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
      <div className="slug">
        <ContentLoad value={verse?.slug} lorem_count={3} />
      </div>
    </div>
  );
}

export default Verse;
