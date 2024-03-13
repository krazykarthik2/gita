import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function NextChapterBtn({ link }) {
  return (
    <Link
      to={link}
      className="next-chapter px-2 py-2 rounded-3 text-decoration-none d-center action-btn  gap-2"
    >
      <div className="span d-none d-sm-flex h3 align-self-center align-items-center m-0">
        next chapter
      </div>
      <div className="icon book-icon d-center">
        <FaArrowRight size={"1.2em"} />{" "}
      </div>
    </Link>
  );
}
