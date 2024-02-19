import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu from "./assets/menu.svg";
import "./NavBar.css";

function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function onToggleMenu() {
    setMenuOpen(prev => !prev);
  }

  return (
    <nav className="flex justify-evenly items-center w-full h-14 mx-auto bg-gray-800 bg-opacity-70">
      <a
        className="text-2xl start-5 absolute text-gray-300"
        href="/">
        blueArg
      </a>
      <div
        className={`nav-links  duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 ${
          isMenuOpen ? "top-[9%]" : "-top-full"
        } md:w-auto w-full flex items-center z-50 justify-center mx-auto`}>
        <ul className="flex md:flex-row flex-col md:items-center gap-8 z-50">
          <Link
            className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white"
            to="/">
            HOME
          </Link>
          <Link
            className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white"
            to="/cotizaciones">
            PRICES
          </Link>
          <Link
            className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white"
            to="/graficos">
            TRADING
          </Link>
        </ul>
      </div>
      <div className="flex items-center gap-6"></div>
      <img
        onClick={onToggleMenu}
        className="menu w-10 cursor-pointer absolute end-5 md:hidden"
        src={menu}
        alt="menu"
      />
    </nav>
  );
}

export default NavBar;
