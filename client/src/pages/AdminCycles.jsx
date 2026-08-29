import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllCycles,
  deleteCycle,
} from "../services/cycleService";

function AdminCycles() {
  const navigate = useNavigate();

  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET CYCLES =================

  const fetchCycles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCycles();

      console.log("Cycles response:", response);

      if (response.success) {
        setCycles(response.cycles || []);
      } else {
        setCycles([]);
        setError(
          response.message || "Failed to load cycles"
        );
      }
    } catch (err) {
      console.error("Get cycles error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load cycles"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD =================

  useEffect(() => {
    fetchCycles();
  }, []);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cycle?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await deleteCycle(id);

      // Refresh list
      await fetchCycles();
    } catch (err) {
      console.error("Delete cycle error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete cycle"
      );
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            🚴
          </div>

          <p className="text-lg font-semibold text-[var(--color-dark-blue)]">
            Loading cycles...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Please wait while we load your cycles
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">🚲</span>

              <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                Admin
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl">
              Manage Cycles
            </h1>

            <p className="mt-2 text-[var(--color-text)]">
              Add, edit and delete cycles from your store.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/cycles/add")
            }
            className="rounded-xl bg-[var(--color-primary)] px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
          >
            + Add Cycle
          </button>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600 shadow-sm">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}


        {/* ================= NO CYCLES ================= */}

        {cycles.length === 0 ? (

          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-lg">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-bg)] text-4xl">
              🚲
            </div>

            <h2 className="text-2xl font-bold text-[var(--color-dark-blue)]">
              No Cycles Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Your cycle collection is currently empty.
              Add your first cycle to get started.
            </p>

            <button
              onClick={() =>
                navigate("/admin/cycles/add")
              }
              className="mt-6 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)]"
            >
              + Add Cycle
            </button>

          </div>

        ) : (

          /* ================= CYCLE GRID ================= */

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {cycles.map((cycle) => (

              <div
                key={cycle._id}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50">

                  {cycle.image ? (

                    <img
                      src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
                      alt={cycle.name}
                      className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
                    />

                  ) : (

                    <div className="text-center text-gray-400">

                      <div className="mb-2 text-4xl">
                        🚲
                      </div>

                      <p className="text-sm font-medium">
                        No Image
                      </p>

                    </div>

                  )}

                </div>


                {/* ================= CONTENT ================= */}

                <div className="p-6">

                  <div className="mb-4">

                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {cycle.brand}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[var(--color-dark-blue)]">
                      {cycle.name}
                    </h2>

                  </div>


                  {/* PRICE + STOCK */}

                  <div className="flex items-center justify-between">

                    <p className="text-2xl font-bold text-[var(--color-primary)]">
                      ₹{cycle.price}
                    </p>

                    <p className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
                      Stock: {cycle.stock}
                    </p>

                  </div>


                  {/* CATEGORY */}

                  <div className="mt-4">

                    <span className="inline-flex rounded-full bg-[var(--color-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--color-dark-blue)]">
                      {cycle.category}
                    </span>

                  </div>


                  {/* ================= BUTTONS ================= */}

                  <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">

                    {/* EDIT */}

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/cycles/edit/${cycle._id}`
                        )
                      }
                      className="flex-1 rounded-xl border border-[var(--color-primary)] px-4 py-2.5 font-semibold text-[var(--color-primary)] transition duration-200 hover:bg-[var(--color-bg)]"
                    >
                      ✏️ Edit
                    </button>


                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(cycle._id)
                      }
                      className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 font-semibold text-white shadow-sm transition duration-200 hover:bg-red-600 hover:shadow-md"
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminCycles;

