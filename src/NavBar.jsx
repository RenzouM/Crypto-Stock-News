import React from "react";
import { Link } from "react-router-dom";
import menu from "./assets/menu.svg";
import "./NavBar.css";

function NavBar() {
  const navLinks = document.querySelector(".nav-links");
  function onToggleMenu(e) {
    e.name = e.name === "menu" ? "close" : "menu";
    navLinks.classList.toggle("top-[9%]");
  }
  return (
    <header className="bg-black">
      <nav className="flex justify-between items-center w-[92%] h-14 mx-auto">
        <a className="absolute start-5 text-lg" href="/">
          blueArg
        </a>
        <div className="nav-links duration-500 md:static absolute bg-black md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center z-50 justify-center mx-auto">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 bg-black z-50 ">
            <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white" to="/">
              <li>Inicio</li>
            </Link>
            <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white" to="http://localhost:5173/cotizaciones">
              <li>Cotizaciones</li>
            </Link>
            <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white" to="http://localhost:5173/graficos">
              <li>Trading</li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center gap-6"></div>
        <img onClick={onToggleMenu} className="menu w-10 cursor-pointer absolute end-5 md:hidden" src={menu} alt="..." />
      </nav>
    </header>
  );
}

export default NavBar;
