import React from "react";

function LanguageSelector({ langCtx }) {
  return (
    <div className="radio-select hstack px-2 py-1 bg-dark text-white rounded-pill gap-2">
      <button
        className={
          "btn rounded-circle text-white radio-circle p-0 fw-bold border-0 " +
          (langCtx.language == "english" ? "bg-secondary" : "")
        }
        onClick={() => { 
          langCtx.setLanguage("english");
        }}
      >
        EN
      </button>
      <button
        className={
          "btn rounded-circle text-white radio-circle p-0 fw-bold border-0 " +
          (langCtx.language == "hindi" ? "bg-secondary" : "")
        }
        onClick={() => {
          langCtx.setLanguage("hindi");
        }}
      >
        HI
      </button>
    </div>
  );
}
export default LanguageSelector;