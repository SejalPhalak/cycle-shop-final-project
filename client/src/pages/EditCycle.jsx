import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCycleById,
  updateCycle,
} from "../services/cycleService";

function EditCycle() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ================= FORM DATA =================

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null,
  });

  // Old image URL
  const [oldImage, setOldImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // New image selected or not
  const [changeImage, setChangeImage] = useState(false);

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
          image: null,
        });

        // Store old image separately
        setOldImage(cycle.image || "");

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
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));

    // If image selected
    if (name === "image" && files[0]) {
      setChangeImage(true);
    }
  };

  // ================= CHANGE IMAGE =================

  const handleChangeImage = () => {
    setChangeImage(true);
  };

  // ================= KEEP OLD IMAGE =================

  const handleKeepCurrentImage = () => {
    setChangeImage(false);

    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  // ================= UPDATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      // ================= FORM DATA =================

      const data = new FormData();

      data.append("name", formData.name.trim());
      data.append("brand", formData.brand.trim());
      data.append("price", Number(formData.price));
      data.append("category", formData.category);
      data.append("stock", Number(formData.stock));
      data.append(
        "description",
        formData.description.trim()
      );

      // New image only if selected
      if (changeImage && formData.image) {
        data.append("image", formData.image);
      }

      const response = await updateCycle(id, data);

      console.log("Update cycle response:", response);

      if (response.success) {
        navigate("/admin/cycles");
      } else {
        setError(
          response.message ||
            "Failed to update cycle"
        );
      }

    } catch (err) {
      console.error("Update cycle error:", err);

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
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <p className="text-lg">
          Loading cycle...
        </p>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-10">

      <div className="mx-auto max-w-2xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() => navigate("/admin/cycles")}
            className="mb-4 font-semibold text-[var(--color-primary)] hover:underline"
          >
            ← Back to Manage Cycles
          </button>

          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)]">
            Edit Cycle
          </h1>

          <p className="mt-2 text-[var(--color-text)]">
            Update cycle information
          </p>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-5 rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
        >

          <div className="space-y-5">

            {/* ================= NAME ================= */}

            <div>
              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Cycle Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* ================= BRAND ================= */}

            <div>
              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* ================= PRICE ================= */}

            <div>
              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* ================= STOCK ================= */}

            <div>
              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* ================= CATEGORY ================= */}

            <div>
              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[var(--color-primary)]"
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

              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Cycle Image
              </label>

              {/* OLD IMAGE */}

              {!changeImage && oldImage && (
                <div className="mb-4">

                  <p className="mb-2 text-sm text-gray-500">
                    Current Image
                  </p>

                  <img
                    src={oldImage}
                    alt={formData.name}
                    className="h-48 w-full rounded-xl border object-cover"
                  />

                </div>
              )}

              {/* CHANGE IMAGE BUTTON */}

              {!changeImage ? (

                <button
                  type="button"
                  onClick={handleChangeImage}
                  disabled={saving}
                  className="rounded-xl border border-[var(--color-primary)] px-5 py-3 font-semibold text-[var(--color-primary)] hover:bg-gray-50 disabled:opacity-60"
                >
                  Change Image
                </button>

              ) : (

                <div className="space-y-4">

                  {/* FILE INPUT */}

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                  />

                  {/* SELECTED FILE */}

                  {formData.image && (
                    <p className="text-sm text-gray-500">
                      Selected: {formData.image.name}
                    </p>
                  )}

                  {/* KEEP CURRENT IMAGE */}

                  <button
                    type="button"
                    onClick={handleKeepCurrentImage}
                    disabled={saving}
                    className="rounded-xl border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                  >
                    Keep Current Image
                  </button>

                </div>

              )}

            </div>

            {/* ================= DESCRIPTION ================= */}

            <div>
              <label className="mb-2 block font-medium text-[var(--color-text)]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>

          </div>

          {/* ================= BUTTONS ================= */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() => navigate("/admin/cycles")}
              disabled={saving}
              className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white hover:bg-[var(--color-dark-blue)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Updating Cycle..."
                : "Update Cycle"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditCycle;