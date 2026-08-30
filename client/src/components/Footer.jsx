import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08080f] text-white">

      {/* Background Glow */}

      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#ff5722] opacity-10 blur-3xl"></div>

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#ff5722] opacity-5 blur-3xl"></div>


      {/* Dot Pattern */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:18px_18px]"></div>
      </div>


      {/* Main Footer */}

      <div className="relative mx-auto max-w-[1280px] px-5 pb-12 pt-16 sm:px-8 lg:pt-20">

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">


          {/* ================= BRAND ================= */}

          <div>

            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff5722] shadow-lg shadow-orange-950/40 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <span className="text-2xl">
                  🚴
                </span>
              </div>

              <div className="leading-none">

                <h2 className="text-[21px] font-black tracking-tight">
                  Cycle<span className="text-[#ff5722]">Hub</span>
                </h2>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                  Ride made effortless
                </p>

              </div>

            </Link>


            <p className="mt-6 max-w-sm text-sm leading-6 text-gray-400">
              Your trusted companion for quality cycles —
              built for everyday rides, weekend adventures
              and every journey in between.
            </p>


            {/* Contact */}

            <div className="mt-7 space-y-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#ff5722]">
                  ✉
                </div>

                <span className="text-sm text-gray-400">
                  support@cyclehub.com
                </span>

              </div>


              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#ff5722]">
                  ☎
                </div>

                <span className="text-sm text-gray-400">
                  +91 00000 00000
                </span>

              </div>


              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-[#ff5722]">
                  ⌖
                </div>

                <span className="text-sm text-gray-400">
                  Nashik · Maharashtra · India
                </span>

              </div>

            </div>


            {/* Social */}

            <div className="mt-7 flex gap-2">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#ff5722] hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#ff5722] hover:text-white"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#ff5722] hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#ff5722] hover:text-white"
              >
                in
              </a>

            </div>

          </div>


          {/* ================= COMPANY ================= */}

          <div>

            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#ff5722]">
              Company
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/about"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Contact
              </Link>

              <Link
                to="/cycles"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Our Cycles
              </Link>

              <Link
                to="/cycles"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Explore
              </Link>

            </div>

          </div>


          {/* ================= SERVICES ================= */}

          <div>

            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#ff5722]">
              Services
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/cycles"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Cycle Rentals
              </Link>

              <Link
                to="/cycles"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Mountain Bikes
              </Link>

              <Link
                to="/cycles"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Sports Cycles
              </Link>

              <Link
                to="/orders"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Manage Orders
              </Link>

            </div>

          </div>


          {/* ================= SUPPORT ================= */}

          <div>

            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#ff5722]">
              Support
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/contact"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Help Center
              </Link>

              <Link
                to="/contact"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                FAQs
              </Link>

              <a
                href="#"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Terms of Service
              </a>

              <a
                href="#"
                className="text-sm text-gray-400 transition hover:translate-x-1 hover:text-white"
              >
                Privacy Policy
              </a>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}

        <div className="mt-14 border-t border-white/10 pt-7">

          <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">

            <p>
              © 2026{" "}
              <span className="font-bold text-white">
                Cycle<span className="text-[#ff5722]">Hub</span>
              </span>
              . All rights reserved.
            </p>

            <p>
              Crafted with{" "}
              <span className="text-[#ff5722]">
                ♥
              </span>{" "}
              for every ride.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
// update code for Footer.jsx
