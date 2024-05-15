import React from "react";
import { BiMenu } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { FaDotCircle, FaHamburger } from "react-icons/fa";
import {
  FaLinesLeaning,
  FaMarsAndVenus,
  FaMarsAndVenusBurst,
  FaSquareArrowUpRight,
  FaThreads,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Credits() {
  return (
    <div className="vw-100 vh-100 d-center flex-column ">
      <Link
        to={"../sitemap"}
        className="position-absolute top-0 start-0 m-5 text-white"
      >
        <BiMenu size={"2.5rem"} />
      </Link>
      credits and made by <br />
      karthik goparaju
      <Link
        to="https://github.com/krazykarthik2"
        className="d-center flex-column text-white"
      >
        <BsGithub size={"3.2rem"} />
        <div>
          <span>github</span>
          <FaSquareArrowUpRight size={".8rem"} />
        </div>
      </Link>
      please help me if you can
      <br />
      admire art
      <div className="position-absolute bottom-0">
        credits for the api
        <br />
        rapidapiv3 bhagavadgitaapi
        <br />
        links
        <br />
        <Link to="https://bhagavadgitaapi.in/">
          https://bhagavadgitaapi.in/
        </Link><br/>
        <Link to="https://github.com/vedicscriptures/bhagavad-gita-api">
          https://github.com/vedicscriptures/bhagavad-gita-api
        </Link>
      </div>
    </div>
  );
}

export default Credits;
