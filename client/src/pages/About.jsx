import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-6 py-16">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--color-dark-blue)]">
            About Us
          </p>

          <h1 className="text-4xl font-bold text-[var(--color-dark-blue)] md:text-5xl">
            Welcome to CycleHub 🚴
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            We make cycling simple, convenient and enjoyable with a
            user-friendly platform built for every cycling enthusiast.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg)] text-3xl">
              🚲
            </div>

            <h2 className="mb-3 text-xl font-bold text-[var(--color-dark-blue)]">
              Quality Cycles
            </h2>

            <p className="text-gray-600">
              Discover reliable and quality cycles designed for a smooth
              and comfortable riding experience.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg)] text-3xl">
              ⚡
            </div>

            <h2 className="mb-3 text-xl font-bold text-[var(--color-dark-blue)]">
              Easy Experience
            </h2>

            <p className="text-gray-600">
              Our simple platform helps you manage and explore cycles
              quickly and effortlessly.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg)] text-3xl">
              ❤️
            </div>

            <h2 className="mb-3 text-xl font-bold text-[var(--color-dark-blue)]">
              Made for Riders
            </h2>

            <p className="text-gray-600">
              Built with a passion for cycling and a focus on creating
              a better experience for every rider.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default About