// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-cyan-700">
          <Link to="/" onClick={closeMenu}>
            GilgitBaltistanTours
          </Link>
        </div>

        {/* Desktop Links (only large screens and above) */}
        <div className="hidden lg:flex gap-6 text-gray-800 font-medium">
          <Link to="/" className="hover:text-cyan-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-cyan-600">
            About
          </Link>
          <Link to="/destinations" className="hover:text-cyan-600">
            Destinations
          </Link>
          <Link to="/packages" className="hover:text-cyan-600">
            Packages
          </Link>
          <Link to="/contact" className="hover:text-cyan-600">
            Contact
          </Link>
        </div>

        {/* Auth Buttons (large screens only) */}
        <div className="hidden lg:flex gap-4">
          <Link
            to="/login"
            className="text-cyan-700 border border-cyan-700 px-4 py-1 rounded hover:bg-cyan-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-cyan-700 text-white px-4 py-1 rounded hover:bg-cyan-800 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile & Tablet Menu Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-cyan-700 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg px-4 pt-4 pb-6 space-y-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-cyan-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-cyan-600"
          >
            About
          </Link>
          <Link
            to="/destinations"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-cyan-600"
          >
            Destinations
          </Link>
          <Link
            to="/packages"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-cyan-600"
          >
            Packages
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-cyan-600"
          >
            Contact
          </Link>
          <hr />
          <Link
            to="/login"
            onClick={closeMenu}
            className="block border border-cyan-700 text-cyan-700 text-center px-4 py-1 rounded hover:bg-cyan-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="block bg-cyan-700 text-white text-center px-4 py-1 rounded hover:bg-cyan-800 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
