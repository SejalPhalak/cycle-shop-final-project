
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addCycle } from "../services/cycleService";

function AddCycle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const response = await addCycle({
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        description: formData.description.trim(),
        image: formData.image,
      });

      console.log("Add cycle response:", response);

      if (response.success) {
        setSuccess("Cycle added successfully!");

        setTimeout(() => {
          navigate("/admin/cycles");
        }, 800);
      } else {
        setError(response.message || "Failed to add cycle");
      }
    } catch (err) {
      console.error("Add cycle error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add cycle. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() => navigate("/admin/cycles")}
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-white hover:shadow-sm"
          >
            ← Back to Manage Cycles
          </button>

          <div className="rounded-2xl bg-[var(--color-dark-blue)] p-7 text-white shadow-xl sm:p-9">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <div className="mb-2 text-3xl">
                  🚴
                </div>

                <h1 className="text-3xl font-bold sm:text-4xl">
                  Add New Cycle
                </h1>

                <p className="mt-2 text-sm text-white/75 sm:text-base">
                  Add a new cycle to your CycleHub store.
                </p>
              </div>

              <div className="hidden h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-4xl sm:flex">
                🚲
              </div>

            </div>

          </div>

        </div>


        {/* ================= ALERTS ================= */}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600 shadow-sm">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-600 shadow-sm">
            <span className="text-lg">✓</span>
            <span>{success}</span>
          </div>
        )}


        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl bg-white shadow-xl"
        >

          {/* Form Header */}

          <div className="border-b border-gray-100 px-6 py-6 sm:px-9">

            <h2 className="text-xl font-bold text-[var(--color-dark-blue)]">
              Cycle Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the details of the cycle you want to add.
            </p>

          </div>


          <div className="space-y-7 px-6 py-7 sm:px-9 sm:py-9">

            {/* ================= BASIC DETAILS ================= */}

            <div className="grid gap-6 md:grid-cols-2">

              {/* NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                  Cycle Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter cycle name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
                />
              </div>


              {/* BRAND */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
                />
              </div>


              {/* PRICE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    min="0"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-9 pr-4 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
                  />
                </div>
              </div>


              {/* STOCK */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                  Available Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter available stock"
                  min="0"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
                />
              </div>

            </div>


            {/* ================= CATEGORY ================= */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition duration-200 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
              >

                <option value="">
                  Select Category
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

                <option value="Kids">
                  Kids
                </option>

              </select>

            </div>


            {/* ================= IMAGE ================= */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                Cycle Image
              </label>

              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition hover:border-[var(--color-primary)]">

                <div className="mb-3 text-4xl">
                  🖼️
                </div>

                <p className="mb-3 text-sm font-medium text-gray-600">
                  Upload cycle image
                </p>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="mx-auto block w-full max-w-md rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-600 outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
                />

                {formData.image && (
                  <p className="mt-3 text-sm font-medium text-[var(--color-primary)]">
                    Selected: {formData.image.name}
                  </p>
                )}

              </div>

            </div>


            {/* ================= DESCRIPTION ================= */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter cycle description"
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition duration-200 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
              />

            </div>

          </div>


          {/* ================= BUTTONS ================= */}

          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-6 py-6 sm:flex-row sm:justify-end sm:px-9">

            <button
              type="button"
              onClick={() => navigate("/admin/cycles")}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--color-primary)] px-8 py-3.5 font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? "Adding Cycle..." : "Add Cycle"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddCycle;

