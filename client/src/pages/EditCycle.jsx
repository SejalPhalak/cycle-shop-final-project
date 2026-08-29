
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCycleById,
  updateCycle,
} from "../services/cycleService";

function EditCycle() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ================= GET CYCLE =================

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCycleById(id);

        const cycle = response.cycle || response.data;

        if (!cycle) {
          setError("Cycle not found");
          return;
        }

        setFormData({
          name: cycle.name || "",
          brand: cycle.brand || "",
          price: cycle.price || "",
          category: cycle.category || "",
          stock: cycle.stock || "",
          description: cycle.description || "",
          image: cycle.image || "",
        });
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load cycle"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCycle();
  }, [id]);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPDATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const response = await updateCycle(id, {
        name: formData.name.trim(),
        brand: formData.brand.trim(),
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        description: formData.description.trim(),
        image: formData.image.trim(),
      });

      if (response.success) {
        navigate("/admin/cycles");
      } else {
        setError(
          response.message || "Failed to update cycle"
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to update cycle"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            🚲
          </div>

          <p className="text-lg font-semibold text-[var(--color-dark-blue)]">
            Loading cycle...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Preparing cycle information
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/cycles")
            }
            className="mb-5 inline-flex items-center gap-2 rounded-lg px-2 py-2 font-semibold text-[var(--color-primary)] transition hover:bg-white hover:text-[var(--color-dark-blue)]"
          >
            ← Back to Manage Cycles
          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
              ✏️
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                Admin Panel
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl">
                Edit Cycle
              </h1>

            </div>

          </div>

          <p className="mt-3 text-[var(--color-text)]">
            Update the information of your cycle.
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600 shadow-sm">

            <span className="text-lg">
              ⚠️
            </span>

            <span>
              {error}
            </span>

          </div>
        )}


        {/* ================= FORM CARD ================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl bg-white shadow-xl"
        >

          {/* Form Header */}

          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8">

            <h2 className="font-bold text-[var(--color-dark-blue)]">
              Cycle Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Make the required changes and save your updates.
            </p>

          </div>


          <div className="p-6 sm:p-8">

            <div className="space-y-6">

              {/* ================= NAME ================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Cycle Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter cycle name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* ================= BRAND ================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* ================= PRICE + STOCK ================= */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Price */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                    Price
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">
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
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-9 pr-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                    />

                  </div>

                </div>


                {/* Stock */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Available stock"
                    min="0"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />

                </div>

              </div>


              {/* ================= CATEGORY ================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
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

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter cycle image URL"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>


              {/* ================= DESCRIPTION ================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[var(--color-dark-blue)]">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter cycle description"
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-6 outline-none transition focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20"
                />

              </div>

            </div>


            {/* ================= BUTTONS ================= */}

            <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">

              {/* Cancel */}

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/cycles")
                }
                disabled={saving}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3.5 font-semibold text-gray-600 transition duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>


              {/* Update */}

              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-[var(--color-primary)] px-5 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Updating..."
                  : "✓ Update Cycle"}
              </button>

            </div>

          </div>

        </form>


        {/* ================= FOOTER NOTE ================= */}

        <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
          <span>🚲</span>
          <span>
            Keep your CycleHub inventory up to date.
          </span>
        </div>

      </div>

    </div>
  );
}

export default EditCycle;

