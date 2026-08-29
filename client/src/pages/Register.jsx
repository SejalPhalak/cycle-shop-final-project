import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(name, email, password);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[var(--color-bg)] px-4 py-10">

      {/* Decorative Background */}

      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-secondary)] opacity-30 blur-3xl"></div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[var(--color-primary)] opacity-10 blur-3xl"></div>


      {/* Register Card */}

      <div className="relative w-full max-w-md">

        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white p-6 shadow-2xl sm:p-8">

          {/* ================= HEADER ================= */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-bg)] text-4xl shadow-sm">
              🚴
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-dark-blue)] sm:text-4xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-[var(--color-text)] sm:text-base">
              Join CycleHub and start your cycling journey
            </p>

          </div>


          {/* ================= ERROR ================= */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              <span className="text-lg">
                ⚠️
              </span>

              <p className="font-medium">
                {error}
              </p>

            </div>
          )}


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                Full Name
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  👤
                </span>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-xl border border-[var(--color-secondary)] bg-gray-50 py-3 pl-11 pr-4 text-[var(--color-text)] outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-secondary)]"
                />

              </div>

            </div>


            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                Email Address
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  ✉️
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-[var(--color-secondary)] bg-gray-50 py-3 pl-11 pr-4 text-[var(--color-text)] outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-secondary)]"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                Password
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔒
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-[var(--color-secondary)] bg-gray-50 py-3 pl-11 pr-4 text-[var(--color-text)] outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-secondary)]"
                />

              </div>

            </div>


            {/* ================= REGISTER BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[var(--color-primary)] py-3.5 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

          </form>


          {/* ================= LOGIN ================= */}

          <div className="mt-7 border-t border-gray-100 pt-6 text-center">

            <p className="text-sm text-[var(--color-text)]">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-[var(--color-primary)] transition hover:text-[var(--color-dark-blue)]"
              >
                Login
              </Link>
            </p>

          </div>


          {/* ================= FOOTER ================= */}

          <p className="mt-5 text-center text-xs text-gray-400">
            🚴 Ride better. Explore more. Live freely.
          </p>

        </div>

      </div>

    </main>
  );
}

export default Register;

