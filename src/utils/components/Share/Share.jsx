import React from "react";
import { Link } from "react-router-dom";
import { FaShareNodes } from "react-icons/fa6";

const Share = ({ url, text = "Share this page",title="share bhagavadgita" }) => {
  // Use the userAgent to detect browser support and handle accordingly

  const handleClick = () => {
    // Use navigator.clipboard API for mobile devices
    navigator.share({
      title:title,
      url:url,
      text:text,
    })
      .then(() => console.log("Copied to clipboard!"))
      .catch((error) => console.error("Copy failed:", error));
  };

  return (
    <button
      to="#"
      onClick={handleClick}
      className="share-button border-0 rounded-circle bg-dark text-info p-2 d-flex justify-content-center align-items-center"
      style={{ width: "4em", height: "4em" }}
    >
      <FaShareNodes size="2em" color="#fff" />
    </button>
  );
};

export default Share;
