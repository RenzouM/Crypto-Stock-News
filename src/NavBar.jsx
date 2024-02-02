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
    <nav className="flex justify-evenly items-center w-full h-14 mx-auto bg-black">
      <a
        className="text-lg start-5 absolute"
        href="/">
        blueArg
      </a>
      <div
        className={`nav-links duration-500 md:static absolute bg-black md:min-h-fit min-h-[60vh] left-0 ${
          isMenuOpen ? "top-[9%]" : "-top-full"
        } md:w-auto w-full flex items-center z-50 justify-center mx-auto`}>
        <ul className="flex md:flex-row flex-col md:items-center gap-8 bg-black z-50">
          <Link
            className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white"
            to="/">
            <li>Inicio</li>
          </Link>
          <Link
            className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white"
            to="/cotizaciones">
            <li>Cotizaciones</li>
          </Link>
          <Link
            className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white"
            to="/graficos">
            <li>Trading</li>
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
