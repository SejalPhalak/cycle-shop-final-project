import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getFavourites,
  removeFavourite,
} from "../services/favouriteService";

import Loader from "../components/Loader";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  // ================= GET FAVOURITES =================
  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFavourites();

      // Backend returns "cycles"
      setFavourites(response.cycles || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load favourites."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= REMOVE FAVOURITE =================
  const handleRemove = async (cycleId) => {
    try {
      setActionLoading(true);
      setError("");

      await removeFavourite(cycleId);

      // Remove from UI
      setFavourites((previous) =>
        previous.filter(
          (cycle) => cycle._id !== cycleId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to remove favourite."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            ❤️
          </div>

          <Loader />

          <p className="mt-3 text-sm text-gray-500">
            Loading your favourite cycles...
          </p>

        </div>

      </main>
    );
  }

  // ================= ERROR =================
  if (error && favourites.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="w-full max-w-md rounded-3xl bg-white px-6 py-12 text-center shadow-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-4xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-2xl font-bold text-[var(--color-dark-blue)]">
            Something went wrong
          </h2>

          <p className="mt-2 leading-6 text-[var(--color-text)]">
            {error}
          </p>

          <button
            onClick={fetchFavourites}
            className="mt-6 rounded-xl bg-[var(--color-primary)] px-7 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  // ================= EMPTY =================
  if (favourites.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] px-4 py-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          {/* Header */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              ❤️
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Saved Cycles
            </p>

          </div>


          {/* Empty Card */}

          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-lg">

            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[var(--color-bg)] text-6xl">
              ❤️
            </div>

            <h1 className="mt-7 text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl">
              No Favourites Yet
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-7 text-[var(--color-text)]">
              Save the cycles you love and easily find
              them here whenever you're ready for your
              next ride.
            </p>

            <Link
              to="/cycles"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-7 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
            >
              <span>🚲</span>
              Explore Cycles
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // ================= FAVOURITES PAGE =================
  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-primary)] shadow-sm">
              <span>❤️</span>
              Saved Collection
            </div>

            <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl lg:text-5xl">
              My Favourites
            </h1>

            <p className="mt-2 text-[var(--color-text)]">
              Your favourite cycles, all in one place.
            </p>

          </div>


          {/* Count */}

          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-bg)] text-lg">
              🚲
            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Saved
              </p>

              <p className="font-bold text-[var(--color-dark-blue)]">
                {favourites.length}{" "}
                {favourites.length === 1
                  ? "Cycle"
                  : "Cycles"}
              </p>

            </div>

          </div>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">

            <span className="text-lg">
              ⚠️
            </span>

            <span>
              {error}
            </span>

          </div>
        )}


        {/* ================= CARDS ================= */}

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {favourites.map((cycle) => (

            <div
              key={cycle._id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >

              {/* ================= IMAGE ================= */}

              <Link to={`/cycles/${cycle._id}`}>

                <div className="relative h-60 overflow-hidden bg-[var(--color-bg)]">

                  <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
                    alt={cycle.name}
                    className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                  />

                  {/* Favourite Badge */}

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg shadow-md backdrop-blur">
                    ❤️
                  </div>

                  {/* Category Badge */}

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[var(--color-primary)] shadow-sm backdrop-blur">
                    {cycle.category}
                  </div>

                </div>

              </Link>


              {/* ================= CONTENT ================= */}

              <div className="p-5">

                {/* Name */}

                <Link to={`/cycles/${cycle._id}`}>

                  <h2 className="line-clamp-1 text-xl font-bold text-[var(--color-dark-blue)] transition group-hover:text-[var(--color-primary)]">
                    {cycle.name}
                  </h2>

                </Link>


                {/* Brand */}

                <p className="mt-1 text-sm text-[var(--color-text)]">
                  {cycle.brand}
                </p>


                {/* Price + Stock */}

                <div className="mt-4 flex items-end justify-between gap-3">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Price
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-[var(--color-primary)]">
                      ₹{cycle.price?.toLocaleString("en-IN")}
                    </p>

                  </div>


                  <div
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      cycle.stock > 0
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {cycle.stock > 0
                      ? `${cycle.stock} available`
                      : "Out of stock"}
                  </div>

                </div>


                {/* ================= BUTTONS ================= */}

                <div className="mt-5 flex gap-2">

                  <Link
                    to={`/cycles/${cycle._id}`}
                    className="flex-1 rounded-xl bg-[var(--color-primary)] px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[var(--color-dark-blue)] hover:shadow-md"
                  >
                    View Details
                  </Link>


                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      handleRemove(cycle._id)
                    }
                    className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 transition duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-12 rounded-3xl bg-[var(--color-dark-blue)] px-6 py-9 text-center shadow-xl sm:px-10">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
            🚴
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Looking for More?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/70">
            Explore our complete collection and find
            another cycle for your next adventure.
          </p>

          <Link
            to="/cycles"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[var(--color-dark-blue)] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore More Cycles
            <span>→</span>
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Favourites;
