import React from "react";
import Share from "../../../utils/components/Share";
import LanguageSelector from "./LanguageSelector";

export function BottomRow({  langCtx ,url,text,title,number }) {
  return (
    <div className="down-cont hstack justify-content-between">
      <div className="left w-100">
        <Share
          url={url}
          text={text}
          title={title} />
      </div>
      <div className="chapter_number center h4 user-select-none w-100 d-center">
        {number}
      </div>
      <div className="right d-center justify-content-end w-100 ">
        <div>
          <LanguageSelector langCtx={langCtx} />
        </div>
      </div>
    </div>
  );
}
