import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);
    closeMenu();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 grid grid-cols-3 items-center">
        {/* Brand Logo */}
        <div className="text-2xl font-bold text-cyan-700">
          <Link to="/" onClick={closeMenu}>
            GilgitBaltistanTours
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex justify-center gap-6 text-gray-800 font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-cyan-600">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex justify-end items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={toggleDropdown}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-100 rounded"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-cyan-100 rounded"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex justify-end items-center col-span-3">
          <button onClick={toggleMenu} className="text-cyan-700 text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg px-4 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className="block hover:text-cyan-600"
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t pt-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:bg-cyan-100 rounded"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:bg-cyan-100 rounded"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
