import React from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

function Krishna() {
  return (
    <div className="w-100 h-100 d-center">
      <Link
        to={"../sitemap"}
        className="position-absolute top-0 start-0 m-3 text-white"
      >
        <BiMenu size={"2.5rem"} />
      </Link>
      Krishna
    </div>
  );
}

export default Krishna;
