import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex p-0 m-0 w-full justify-center bg-black sticky top-0 z-50">
      <h2 className="texto2 text-2xl text-gray-500 my-auto absolute left-4 top-3">blueArg</h2>
      <div className="flex w-auto justify-center gap-28 text-gray-300 m-0 h-14">
        <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white" to="/">
          Inicio
        </Link>
        <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white" to="http://localhost:5173/cotizaciones">
          Cotizaciones
        </Link>
        <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white" to="http://localhost:5173/graficos">
          Graficos
        </Link>
        <Link className="texto2 text-blue-300 text-lg my-3 bg-transparent active:text-white">Trading</Link>
      </div>
    </nav>
  );
}

export default NavBar;
