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

      {/* ================= HEADER ================= */}
      <section className="px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Explore Our Collection
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl lg:text-5xl">
              Find Your Perfect Ride
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text)]">
              Discover quality cycles designed for every kind of ride.
            </p>

          </div>

        </div>
      </section>


      {/* ================= SEARCH & FILTER ================= */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Search + Category */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">

              {/* Search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cycles..."
                className="w-full rounded-xl border border-[var(--color-secondary)] px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary)] sm:max-w-sm"
              />

              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-secondary)] bg-white px-4 py-3 text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary)] sm:w-auto"
              >
                <option value="">All Categories</option>

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

            </div>


            {/* Result Count */}
            {!loading && !error && (
              <p className="whitespace-nowrap text-sm font-medium text-[var(--color-text)]">
                {filteredCycles.length}{" "}
                {filteredCycles.length === 1
                  ? "Cycle"
                  : "Cycles"}{" "}
                Found
              </p>
            )}

          </div>

        </div>

      </section>


      {/* ================= CYCLES ================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* Loading */}
          {loading && <Loader />}


          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="mx-auto max-w-md">

                <h2 className="text-xl font-bold text-red-500">
                  Something went wrong
                </h2>

                <p className="mt-2 text-[var(--color-text)]">
                  {error}
                </p>

                <button
                  onClick={fetchCycles}
                  className="mt-5 rounded-full bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-dark-blue)]"
                >
                  Try Again
                </button>

              </div>

            </div>
          )}


          {/* No Search Result */}
          {!loading &&
            !error &&
            filteredCycles.length === 0 && (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                <div className="mx-auto max-w-md">

                  <div className="text-5xl">
                    🚲
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-[var(--color-dark-blue)]">
                    No Cycles Found
                  </h2>

                  <p className="mt-2 text-[var(--color-text)]">
                    Try another cycle name, brand, or category.
                  </p>

                  {/* Clear Search */}
                  {(search || category) && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setCategory("");
                      }}
                      className="mt-5 rounded-full bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-dark-blue)]"
                    >
                      Clear Filters
                    </button>
                  )}

                </div>

              </div>
            )}


          {/* Cycle Cards */}
          {!loading &&
            !error &&
            filteredCycles.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

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

    </main>
  );
}

export default Cycles;