import React from "react";

function Verse({ verse }) {
  return (
    <div className="verse-cont">
      <div className="chaptegr_number">{verse?.chapter_number}</div>
      <div className="commentaries">{verse?.commentaries}</div>
      <div className="id">{verse?.id} </div>
      <div className="slug">{verse?.slug}</div>
      <div className="text">{verse?.text} </div>
      <div className="translations">{verse?.translations}</div>
      <div className="transliteration">{verse?.transliteration} </div>
      <div className="verse_number">{verse?.verse_number}</div>
      <div className="word_meanings">{verse?.word_meanings}</div>
    </div>
  );
}

export default Verse;
