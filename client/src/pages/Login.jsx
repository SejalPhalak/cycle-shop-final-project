import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-[var(--color-bg)] px-4 py-10">

      {/* Background Decorations */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />


      {/* ================= LOGIN CARD ================= */}

      <div className="relative w-full max-w-md">

        {/* Logo Icon */}

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-dark-blue)] text-3xl shadow-xl">
          🚴
        </div>


        <div className="rounded-3xl border border-white/60 bg-white p-6 shadow-2xl sm:p-8">

          {/* ================= HEADING ================= */}

          <div className="mb-8 text-center">

            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Welcome Back
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[var(--color-dark-blue)]">
              Login to CycleHub
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">
              Sign in to continue your cycling journey.
            </p>

          </div>


          {/* ================= ERROR ================= */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">

              <span className="text-base">
                ⚠️
              </span>

              <span>
                {error}
              </span>

            </div>
          )}


          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-[var(--color-text)] outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />

            </div>


            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Password
                </label>

              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-[var(--color-text)] outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />

            </div>


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--color-primary)] px-5 py-3.5 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login to CycleHub →"}
            </button>

          </form>


          {/* ================= DIVIDER ================= */}

          <div className="my-7 flex items-center gap-3">

            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              New to CycleHub?
            </span>

            <div className="h-px flex-1 bg-gray-200" />

          </div>


          {/* ================= REGISTER ================= */}

          <div className="rounded-2xl bg-[var(--color-bg)] p-4 text-center">

            <p className="text-sm text-[var(--color-text)]">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-1 inline-block font-bold text-[var(--color-primary)] transition hover:text-[var(--color-dark-blue)]"
            >
              Create Your Account →
            </Link>

          </div>

        </div>


        {/* Bottom Text */}

        <p className="mt-5 text-center text-xs text-gray-400">
          Ride better. Explore more. 🚲
        </p>

      </div>

    </main>
  );
}

export default Login;
