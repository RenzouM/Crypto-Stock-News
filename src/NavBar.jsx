import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(true);

  function onToggleMenu() {
    setMenuOpen(prev => !prev);
  }

  return (
    <nav className={`${isMenuOpen ? "rounded-full" : "rounded-3xl"}  border-gray-200 sticky top-0 max-w-[1200px] mx-auto mt-4 bg-gray-900 p-2 border-2 z-30`}>
      <div className=" mx-auto py-2 px-4 sm:flex items-center justify-between">
        <div className="flex w-full justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/135px-Flag_of_Argentina.svg.png"
              className="h-8 w-8 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="text-2xl font-semibold  text-white">blueArg</span>
          </Link>
          <button
            onClick={onToggleMenu}
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 :focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={isMenuOpen}>
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div
          className={`w-full md:flex md:items-center md:w-auto ${isMenuOpen ? "hidden" : ""}`}
          id="navbar-dropdown">
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-200 hover:text-blue-400 :text-white :hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cotizaciones"
                className="block py-2 px-3 text-gray-200 hover:text-blue-400 :text-white :hover:text-blue-500">
                Prices
              </Link>
            </li>
            <li>
              <Link
                to="/graficos"
                className="block py-2 px-3 text-gray-200 hover:text-blue-400 :text-white :hover:text-blue-500">
                Trading
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
