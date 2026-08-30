import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08080f] text-white">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#ff5722] opacity-10 blur-3xl"></div>

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#ff5722] opacity-5 blur-3xl"></div>


      {/* ================= DOT PATTERN ================= */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:18px_18px]"></div>
      </div>


      {/* ================= MAIN FOOTER ================= */}

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


          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#ff5722]">
              Contact
            </h3>


            {/* ================= EMAIL ================= */}

            <a
              href="mailto:support@cyclehub.com"
              className="mb-4 flex items-center gap-3 group"
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#ff5722] transition group-hover:bg-[#ff5722] group-hover:text-white">
                ✉
              </div>

              <span className="text-sm text-gray-400 transition group-hover:text-white">
                support@cyclehub.com
              </span>

            </a>


            {/* ================= PHONE ================= */}

            <a
              href="tel:+910000000000"
              className="mb-4 flex items-center gap-3 group"
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#ff5722] transition group-hover:bg-[#ff5722] group-hover:text-white">
                ☎
              </div>

              <span className="text-sm text-gray-400 transition group-hover:text-white">
                +91 00000 00000
              </span>

            </a>


            {/* ================= ADDRESS ================= */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nashik%2C%20Maharashtra%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 flex items-center gap-3 group"
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#ff5722] transition group-hover:bg-[#ff5722] group-hover:text-white">
                ⌖
              </div>

              <span className="text-sm text-gray-400 transition group-hover:text-white">
                Nashik · Maharashtra · India
              </span>

            </a>


            {/* ================= SOCIAL MEDIA ================= */}

            <div className="flex gap-2">


              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#1877F2] hover:text-white"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1z" />
                </svg>

              </a>


              {/* YOUTUBE */}

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#FF0000] hover:text-white"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.8V8.2l6.4 3.8-6.4 3.8z" />
                </svg>

              </a>


              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:bg-[#E4405F] hover:text-white"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />

                </svg>

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