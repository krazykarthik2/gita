import React, { useContext } from "react";
import { BottomRow } from "../Chapter/BottomRow";
import languageCtx from "../../../context/languageCtx";
import { Load, ContentLoad } from "../../../utils/components/Loaders";

function BottomRowChapters({ currentIndex, chapter }) {
  const langCtx = useContext(languageCtx);

  return (
    <div className="bottom-cont w-100 d-flex flex-column">
      <BottomRow
        langCtx={langCtx}
        number={currentIndex + 1}
        text={"Share bhagavad gita " + chapter?.name + " "}
        url={"https://www.bhagavadgitakrazy.netlify.app/chapter/" + chapter?.id} />
      <div className="id-cont hstack w-100 justify-content-between d-sm-flex d-none">
        <div className="slug text-gray"><ContentLoad value={chapter?.slug} lorem_count={3} /></div>
        <div className="id d-flex justify-content-end p-1 ">
          <div className="text-muted pe-none">id:<Load value={chapter?.id} /></div>
        </div>
      </div>
    </div>);
}
export default  BottomRowChapters;