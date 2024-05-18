import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center p-4 bg-gray-800 shadow-md">
      <h1 className="ml-7 text-white text-3xl font-bold flex-1">
        Personal Finance Tracker
      </h1>

      <div className="flex items-center">
        <Link
          to="/home"
          className="text-white no-underline px-4 py-1 mx-2 text-lg font-medium rounded hover:bg-gray-700 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white no-underline px-4 py-1 mx-2 text-lg font-medium rounded hover:bg-gray-700 transition duration-300"
        >
          About Me
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
