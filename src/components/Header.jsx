import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import { UserContext } from "../context/userContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div>
      <div className="bg-red-900 p-8 w-full h-auto text-white text-6xl text-center border-b border-white font-playfair font-bold top-0 left-0 z-10">
        <div className="hidden absolute top-0 left-2 p-2 md:block">
          <img src={logo1} alt="Navbar Logo" className="h-24 w-auto" />
        </div>
        Sandwich Kongsi
      </div>
      <div className="flex justify-between items-center bg-red-900 w-full h-auto">
        <Link
          to="/"
          className=" bg-red-900 block py-2 px-4"
          onClick={closeMenu}
        >
          <img src={logo2} alt="Navbar Logo" className="h-8 w-auto block" />
        </Link>
        <nav className="bg-red-900 p-3 w-full h-auto backdrop-filter backdrop-blur-lg px-12">
          {currentUser?.id && (
            <ul className="hidden md:flex md:space-x-4 justify-between text-white font-playfair font-bold">
              <li>
                <Link
                  to={`/profile/${currentUser.id}`}
                  className="block py-2 px-4"
                >
                  {currentUser?.name}'s Profile
                </Link>
              </li>
              <li>
                <Link to="/create" className="block py-2 px-4">
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/authors" className="block py-2 px-4">
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-4">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/logout" className="block py-2 px-4">
                  Logout
                </Link>
              </li>
            </ul>
          )}
          {!currentUser?.id && (
            <ul className="hidden md:flex md:space-x-4 justify-between text-white font-playfair font-bold">
              <li>
                <Link to="/authors" className="block py-2 px-4">
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-4">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="block py-2 px-4">
                  Login
                </Link>
              </li>
            </ul>
          )}
          <button
            className="flex py-2 px-4 text-white text-3xl h-10 md:hidden ml-auto"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <IoMdClose /> : <FaBars />}
          </button>
          {currentUser?.id && isMenuOpen && (
            <div className="absolute top-16 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 font-playfair">
              <ul className="flex flex-col text-black">
                <li>
                  <Link
                    to="/profile/adsf"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/authors"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {!currentUser?.id && isMenuOpen && (
            <div className="absolute top-16 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 font-playfair">
              <ul className="flex flex-col text-black">
                <li>
                  <Link
                    to="/authors"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block py-2 px-4 hover:bg-gray-200"
                    onClick={closeMenu}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
