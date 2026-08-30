
import { useEffect, useState } from "react";

import CycleCard from "../components/CycleCard";
import Loader from "../components/Loader";

import { getAllCycles } from "../services/cycleService";

function Cycles() {
  const [cycles, setCycles] = useState([]);

  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetch cycles
  useEffect(() => {
    fetchCycles();
  }, [category]);

  const fetchCycles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCycles(category);

      setCycles(response.cycles || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load cycles."
      );
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const filteredCycles = cycles.filter((cycle) => {
    const searchText = search.toLowerCase();

    return (
      cycle.name.toLowerCase().includes(searchText) ||
      cycle.brand.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">

      {/* ================= HERO HEADER ================= */}

      <section className="relative overflow-hidden px-4 pb-12 pt-14 sm:px-6 lg:px-8">

        {/* Background decoration */}

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />

        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="text-center">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-primary)] shadow-sm">
              <span>🚴</span>
              Explore Our Collection
            </div>

            <h1 className="text-4xl font-bold leading-tight text-[var(--color-dark-blue)] sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="text-[var(--color-primary)]">
                Perfect Ride
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text)] sm:text-lg">
              Discover quality cycles designed for every
              adventure, every road and every rider.
            </p>

          </div>

        </div>

      </section>


      {/* ================= SEARCH & FILTER ================= */}

      <section className="px-4 pb-10 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Search + Category */}

              <div className="flex w-full flex-col gap-3 sm:flex-row">

                {/* Search */}

                <div className="relative w-full sm:max-w-md">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search by cycle name or brand..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />

                </div>


                {/* Category */}

                <div className="relative">

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-10 text-sm font-medium text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 sm:w-52"
                  >

                    <option value="">
                      All Categories
                    </option>

                    <option value="Mountain">
                      Mountain
                    </option>

                    <option value="Road">
                      Road
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>

                    <option value="Electric">
                      Electric
                    </option>

                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </span>

                </div>

              </div>


              {/* Result Count */}

              {!loading && !error && (
                <div className="flex items-center justify-between gap-3 rounded-xl bg-[var(--color-bg)] px-4 py-3 lg:min-w-fit">

                  <span className="text-lg">
                    🚲
                  </span>

                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    <span className="font-bold text-[var(--color-dark-blue)]">
                      {filteredCycles.length}
                    </span>{" "}
                    {filteredCycles.length === 1
                      ? "Cycle"
                      : "Cycles"}{" "}
                    Found
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* ================= CYCLES ================= */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Loading */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl bg-white shadow-sm">

              <div className="text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-bg)] text-3xl">
                  🚴
                </div>

                <Loader />

                <p className="mt-3 text-sm text-gray-500">
                  Finding the best cycles for you...
                </p>

              </div>

            </div>
          )}


          {/* Error */}

          {!loading && error && (
            <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-lg">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-4xl">
                ⚠️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-red-500">
                Something went wrong
              </h2>

              <p className="mx-auto mt-2 max-w-md leading-6 text-[var(--color-text)]">
                {error}
              </p>

              <button
                onClick={fetchCycles}
                className="mt-6 rounded-xl bg-[var(--color-primary)] px-7 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
              >
                Try Again
              </button>

            </div>
          )}


          {/* No Search Result */}

          {!loading &&
            !error &&
            filteredCycles.length === 0 && (

              <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-lg">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--color-bg)] text-5xl">
                  🚲
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[var(--color-dark-blue)]">
                  No Cycles Found
                </h2>

                <p className="mx-auto mt-2 max-w-md leading-6 text-[var(--color-text)]">
                  Try another cycle name, brand, or category.
                </p>

                {/* Clear Search */}

                {(search || category) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("");
                    }}
                    className="mt-6 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)]"
                  >
                    Clear Filters
                  </button>
                )}

              </div>
            )}


          {/* Cycle Cards */}

          {!loading &&
            !error &&
            filteredCycles.length > 0 && (

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredCycles.map((cycle) => (
                  <CycleCard
                    key={cycle._id}
                    cycle={cycle}
                  />
                ))}

              </div>

            )}

        </div>

      </section>


      {/* ================= BOTTOM ================= */}

      {!loading &&
        !error &&
        filteredCycles.length > 0 && (

          <section className="px-4 pb-14 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl rounded-3xl bg-[var(--color-dark-blue)] px-6 py-8 text-center shadow-xl">

              <div className="text-3xl">
                🚴
              </div>

              <h2 className="mt-3 text-2xl font-bold text-white">
                Ready for Your Next Ride?
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/70">
                Choose a cycle that matches your style,
                adventure and everyday journey.
              </p>

            </div>

          </section>

        )}

    </main>
  );
}

export default Cycles;

