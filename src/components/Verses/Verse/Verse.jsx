import React, { useEffect, useState } from "react";
function TranslationVerse({ translation }) {
  return (
    <div className="translation-verse">
      <div className="translation-description">{translation?.description}</div>
      <div className="translation-description">{translation?.id}</div>
      <div className="translation-description">~{translation?.author}</div>
    </div>
  );
}
function Verse({ verse, langCtx }) {
  window.verse = verse;
  const [randomTranslation, setRandomTranslation] = useState(0);
  useEffect(() => {
    if(verse)
    if(verse.translations)
    setRandomTranslation(
      Math.floor(Math.random() * (verse.translations.length - 1)) + 1
    );
  }, [verse]);
  console.log(verse);
  return verse ? (
    <div className="verse-cont">
      <div className="chaptegr_number">{verse?.chapter_number}</div>
      {/* <div className="commentaries">{verse?.commentaries}</div> */}
      <div className="id">{verse?.id} </div>
      <div className="slug">{verse?.slug}</div>
      <div className="text">{verse?.text} </div>
      <div className="translation-random">
        <TranslationVerse
          translation={verse?.translations[randomTranslation]}
        />
      </div>
      <div className="transliteration">{verse?.transliteration} </div>
      <div className="verse_number">{verse?.verse_number}</div>
      <div className="word_meanings">{verse?.word_meanings}</div>
    </div>
  ) : (
    <></>
  );
}

export default Verse;
