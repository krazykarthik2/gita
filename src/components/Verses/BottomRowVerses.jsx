import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Share from "../../utils/components/Share";
import LanguageSelector from "../Chapters/Chapter/LanguageSelector";
import ThemeSelector from "../../utils/components/Btn/ThemeSelector";

export function BottomRowVerses({
  langCtx,
  number,
  url,
  text,
  title,
  maxlength,
}) {
  const params = useParams();
  return (
    <div className="down-cont hstack justify-content-between">
      <div className="left w-100">
        <Share url={url} text={text} title={title} />
      </div>
      <div className="chapter_number center h4 user-select-none w-100 d-center">
        <div className="h-100 d-center justify-content-between gap-sm-3">
          {number >= 1 ? (
            <Link
              className="prev  fw-bold hstack bg-transparent border-0 text-color text-decoration-none"
              to={`${params.verse_index ? `./../` : `./`}${number - 1 + 1}/`}
            >
              <span className="opacity-25 d-none d-sm-flex">
                {number - 1 + 1}
              </span>
              <div className="icon">
                <FaAngleLeft size={"2em"} />
              </div>
            </Link>
          ) : (
            <Link className="prev  fw-bold hstack bg-transparent border-0 text-color text-decoration-none opacity-50 gap-4 me-2">
              <span className="opacity-25 font-redacted  d-none d-sm-flex">
                x
              </span>
              <div className="icon ">
                <div className="font-redacted " style={{ fontSize: "2em" }}>
                  x
                </div>
              </div>
            </Link>
          )}
          <div className="d-page-number display-3">{number + 1}</div>
          {number < maxlength - 1 ? (
            <Link
              className="next  fw-bold hstack bg-transparent border-0 text-color text-decoration-none"
              to={`${params.verse_index ? `./../` : `./`}${number + 1 + 1}/`}
            >
              <div className="icon">
                <FaAngleRight size={"2em"} />
              </div>
              <span className="opacity-25 d-none d-sm-flex">
                {number + 1 + 1}
              </span>
            </Link>
          ) : (
            <Link className="next  fw-bold hstack bg-transparent border-0 text-color text-decoration-none opacity-50 gap-4 me-2">
              <div className="icon ">
                <div className="font-redacted " style={{ fontSize: "2em" }}>
                  x
                </div>
              </div>
              <span className="opacity-25 font-redacted  d-none d-sm-flex">
                x
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="right d-center justify-content-end w-100 flex-wrap ">
        {" "}
        <div className="act theme d-center">
          <ThemeSelector />
        </div>
        <div className="lang d-center">
          <LanguageSelector langCtx={langCtx} />
        </div>
      </div>
    </div>
  );
}
