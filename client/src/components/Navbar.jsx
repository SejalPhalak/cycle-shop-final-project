import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  /* ================= DESKTOP NAV ================= */

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#17171d] text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-black"
    }`;

  /* ================= MOBILE NAV ================= */

  const mobileNavClass = ({ isActive }) =>
    `rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-[#17171d] text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  /* ================= ICON NAV ================= */

  const iconNavClass = ({ isActive }) =>
    `flex h-11 w-11 items-center justify-center rounded-full text-xl transition-all duration-300 ${
      isActive
        ? "bg-[#17171d] text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 shadow-sm backdrop-blur-xl">

      {/* ================= MAIN NAVBAR ================= */}

      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-8">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >

          {/* Logo Icon */}

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff5722] shadow-lg shadow-orange-200 transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105">

            <span className="text-2xl">
              🚴
            </span>

          </div>

          {/* Brand */}

          <div className="leading-none">

            <h1 className="text-[21px] font-black tracking-tight text-[#17171d]">
              Cycle<span className="text-[#ff5722]">Hub</span>
            </h1>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Ride made effortless
            </p>

          </div>

        </Link>


        {/* ================= DESKTOP CENTER NAV ================= */}

        <div className="hidden items-center rounded-full border border-gray-200 bg-gray-50 p-1.5 shadow-sm md:flex">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/cycles"
            className={navLinkClass}
          >
            Cycles
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={navLinkClass}
          >
            Contact
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/orders"
              className={navLinkClass}
            >
              Orders
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/admin/cycles"
              className={navLinkClass}
            >
              Admin
            </NavLink>
          )}

        </div>


        {/* ================= DESKTOP RIGHT ================= */}

        <div className="hidden items-center gap-3 md:flex">

          {!isLoggedIn ? (

            <>
              {/* Login */}

              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-black"
              >
                <span className="text-base">
                  ↪
                </span>

                Login
              </Link>


              {/* Sign Up */}

              <Link
                to="/register"
                className="rounded-full bg-[#ff5722] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e84b1c] hover:shadow-xl"
              >
                Sign Up
              </Link>
            </>

          ) : (

            <>
              {/* ================= FAVOURITES ================= */}

              <NavLink
                to="/favourites"
                className={iconNavClass}
                title="Favourites"
                aria-label="Favourites"
              >
                ❤️
              </NavLink>


              {/* ================= CART ================= */}

              <NavLink
                to="/cart"
                className={iconNavClass}
                title="Cart"
                aria-label="Cart"
              >
                🛒
              </NavLink>


              {/* ================= USER ================= */}

              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff5722] text-sm font-black text-white">

                  {(user?.name || user?.email || "U")
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <span className="max-w-[120px] truncate text-sm font-bold text-[#17171d]">

                  {user?.name ||
                    user?.username ||
                    user?.email ||
                    "User"}

                </span>

              </div>


              {/* ================= LOGOUT ================= */}

              <button
                onClick={handleLogout}
                className="rounded-full bg-[#17171d] px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#ff5722]"
              >
                Logout
              </button>

            </>

          )}

        </div>


        {/* ================= MOBILE BUTTON ================= */}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-[#17171d] shadow-sm transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {isMenuOpen && (

        <div className="border-t border-gray-200 bg-white px-5 py-5 shadow-xl md:hidden">

          <div className="mx-auto flex max-w-[1280px] flex-col gap-2">

            {/* Home */}

            <NavLink
              to="/"
              onClick={closeMenu}
              className={mobileNavClass}
            >
              🏠 Home
            </NavLink>


            {/* Cycles */}

            <NavLink
              to="/cycles"
              onClick={closeMenu}
              className={mobileNavClass}
            >
              🚲 Cycles
            </NavLink>


            {/* About */}

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={mobileNavClass}
            >
              ℹ️ About
            </NavLink>


            {/* Contact */}

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={mobileNavClass}
            >
              📞 Contact
            </NavLink>


            {/* ================= LOGGED IN LINKS ================= */}

            {isLoggedIn && (

              <>

                <div className="my-2 border-t border-gray-200" />


                {/* Favourites */}

                <NavLink
                  to="/favourites"
                  onClick={closeMenu}
                  className={mobileNavClass}
                >
                  ❤️ Favourites
                </NavLink>


                {/* Cart */}

                <NavLink
                  to="/cart"
                  onClick={closeMenu}
                  className={mobileNavClass}
                >
                  🛒 Cart
                </NavLink>


                {/* Orders */}

                <NavLink
                  to="/orders"
                  onClick={closeMenu}
                  className={mobileNavClass}
                >
                  📦 Orders
                </NavLink>


                {/* Admin */}

                {isAdmin && (

                  <NavLink
                    to="/admin/cycles"
                    onClick={closeMenu}
                    className={mobileNavClass}
                  >
                    ⚙️ Admin
                  </NavLink>

                )}


                {/* ================= USER INFO ================= */}

                <div className="mt-3 rounded-2xl bg-gray-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff5722] font-black text-white">

                      {(user?.name || user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    <div className="min-w-0">

                      <p className="text-xs font-medium text-gray-400">
                        Welcome back
                      </p>

                      <p className="truncate text-sm font-bold text-[#17171d]">

                        {user?.name ||
                          user?.username ||
                          user?.email ||
                          "User"}

                      </p>

                    </div>

                  </div>


                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full rounded-xl bg-[#17171d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ff5722]"
                  >
                    Logout
                  </button>

                </div>

              </>

            )}


            {/* ================= GUEST BUTTONS ================= */}

            {!isLoggedIn && (

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-200 pt-4">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl border-2 border-[#17171d] px-5 py-3 text-center text-sm font-bold text-[#17171d] transition hover:bg-[#17171d] hover:text-white"
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-[#ff5722] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#e84b1c]"
                >
                  Sign Up
                </Link>

              </div>

            )}

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;