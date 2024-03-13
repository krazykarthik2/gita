import React from "react";
import { FaMapSigns } from "react-icons/fa";
import {
  FaBook,
  FaMap
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export function TopRowVerses({ heading }) {
  return (
    <div className="d-flex flex-column  px-4 pt-1">
      <h1 className="user-select-none">{heading}</h1>
      <nav className="hstack justify-content-end gap-2 px-2 user-select-none">
        <Link
          to="/loadmap"
          className="text-decoration-none d-center flex-column text-color"
        >
          <div className="icon">
            <FaMap size={"20px"} />
          </div>
          <div className="text font-px-16">loadmap </div>
        </Link>
        <Link
          to="/sitemap"
          className="text-decoration-none d-center flex-column text-color"
        >
          <div className="icon">
            <FaMapSigns size={"20px"} />
          </div>
          <div className="text font-px-16">sitemap </div>
        </Link>
        <Link
          to="/chapters"
          className="text-decoration-none d-center flex-column text-color"
        >
          <div className="icon">
            <FaBook size={"20px"} />
          </div>
          <div className="text font-px-16">chapters </div>
        </Link>
      </nav>
    </div>
  );
}
