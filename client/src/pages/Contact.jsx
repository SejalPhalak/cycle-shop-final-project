
import React from "react";

function Contact() {
const handleSubmit = () => {
  alert("We will connect you soon!");
};  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10 text-center">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] shadow-sm">
            <span>📞</span>
            Get In Touch
          </div>

          <h1 className="text-4xl font-bold text-[var(--color-dark-blue)] sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text)]">
            Have a question about our cycles or need help?
            We would love to hear from you.
          </p>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="grid gap-7 lg:grid-cols-3">

          {/* ================= CONTACT INFO ================= */}

          <div className="rounded-3xl bg-[var(--color-dark-blue)] p-7 text-white shadow-xl">

            <div className="mb-8">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                🚴
              </div>

              <h2 className="text-2xl font-bold">
                Let's Talk
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/70">
                Our team is here to help you with your
                CycleHub experience.
              </p>

            </div>


            {/* Email */}

            <div className="mb-5 flex items-start gap-4 rounded-2xl bg-white/10 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                ✉️
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium">
                  support@cyclehub.com
                </p>
              </div>

            </div>


            {/* Phone */}

            <div className="mb-5 flex items-start gap-4 rounded-2xl bg-white/10 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                📱
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium">
                  +91 98765 43210
                </p>
              </div>

            </div>


            {/* Location */}

            <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                📍
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium">
                  Maharashtra, India
                </p>
              </div>

            </div>

          </div>


          {/* ================= CONTACT FORM ================= */}

          <div className="rounded-3xl bg-white p-7 shadow-xl lg:col-span-2 sm:p-9">

            <div className="mb-7">

              <h2 className="text-2xl font-bold text-[var(--color-dark-blue)]">
                Send Us a Message
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Fill in the details below and we'll get back to you.
              </p>

            </div>


            <form className="space-y-5">

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* Subject */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What is this about?"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* Message */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full rounded-xl bg-[var(--color-primary)] px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}

        <div className="mt-8 rounded-2xl bg-white p-5 text-center shadow-md">

          <p className="text-sm text-gray-500">
            🚲 Ride better. Ride smarter. Ride with{" "}
            <span className="font-bold text-[var(--color-primary)]">
              CycleHub
            </span>
            .
          </p>

        </div>

      </div>

    </div>
  );
}

export default Contact;

