import React, { useEffect, useState } from "react";
function TranslationVerse({ translation }) {
  window.translation = translation;
  return (
    <div className="translation-verse">
      <div className="translation-description text-decoration-underline">
        {translation?.description}
      </div>
      <div className="hstack justify-content-between">
        <div className="translation-id fw-bold text-gray">
          translate#{translation?.id}
        </div>
        <div className="translation-author">~{translation?.author_name}</div>
      </div>
    </div>
  );
}
function Verse({ verse, langCtx }) {
  window.verse = verse;
  const [randomTranslation, setRandomTranslation] = useState(0);
  const [translationsInLang, setTranslationsInLang] = useState([]);
  useEffect(() => {
    console.log(langCtx.language);
    if(verse)
    if(verse.translations)
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
  console.log(verse);
  return verse ? (
    <div className="verse-cont">
      <div className="d-flex">
        <div className="prefix">BG.</div>
        <div className="chapter_number">{verse?.chapter_number}</div>
        <div className="sep">.</div>
        <div className="verse_number">{verse?.verse_number}</div>
      </div>
        <div className="id text-gray fw-bold pe-none">{verse?.id} </div>
      {/* <div className="commentaries">{verse?.commentaries}</div> */}
      <div className="d-flex flex-column fw-bold ">
        <div className="text h2">{verse?.text} </div>
        <div className="transliteration h3">{verse?.transliteration} </div>
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
      <div className="slug">{verse?.slug}</div>
    </div>
  ) : (
    <></>
  );
}

export default Verse;
