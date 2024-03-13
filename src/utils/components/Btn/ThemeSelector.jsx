import React, { useContext } from "react";
import { themeCtx as themeContext } from "../../../App";
import { FaLaptop, FaMoon, FaSun } from "react-icons/fa6";
import { FiFeather } from "react-icons/fi";
import { IoIosColorPalette } from "react-icons/io";
import { MdBrightnessAuto } from "react-icons/md";
function ThemeSelector() {
  const themeCtx = useContext(themeContext);

  function nextTheme() {
    themeCtx.setTheme(
      themeCtx.themes[
        (themeCtx.themes.findIndex((theme) => theme == themeCtx.theme) + 1) %
          themeCtx.themes.length
      ]
    );
  }
  return (
    <button
      className="action-btn border-0 rounded-3 px-2 py-1 d-center"
      onClick={() => nextTheme()}
    >
      <IoIosColorPalette size={"2em"} />
      <div className=" bg-theme p-1   rounded-3 ">
        {
          {
            light: <FaSun size={"1.5em"} className="text-color" />,
            dark: <FaMoon size={"1.5em"} className="text-color" />,
            blue: <FiFeather size={"1.5em"} className="text-color" />,
            auto: <MdBrightnessAuto size={"1.5em"} className="text-color" />,
          }[themeCtx.theme]
        }
      </div>
    </button>
  );
}
export default ThemeSelector;
