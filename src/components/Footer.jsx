import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-8 text-white font-sans">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mb-8">
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
          <li className="hover:underline">
            {" "}
            <Link to="/posts/categories/Agriculture"> Agriculture</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Business"> Business</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Education"> Education</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Entertainment"> Entertainment</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Art"> Art</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Investment"> Investment</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Uncategorized"> Uncategorized</Link>
          </li>
          <li className="hover:underline">
            <Link to="/posts/categories/Weather"> Weather</Link>
          </li>
        </ul>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-600 pt-4">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold font-playfair">
            Sandwich Kongsi
          </Link>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaSquareXTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">
          &copy; 2024 Sandwich Kongsi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
