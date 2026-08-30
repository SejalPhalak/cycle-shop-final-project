import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  addFavourite,
} from "../services/favouriteService";

import {
  addToCart,
} from "../services/cartService";

import { getCycleById } from "../services/cycleService";
import { useAuth } from "../context/AuthContext";

import Loader from "../components/Loader";

function CycleDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [cycle, setCycle] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [actionError, setActionError] = useState("");

  // ================= FETCH CYCLE =================

  useEffect(() => {
    fetchCycle();
  }, [id]);

  const fetchCycle = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCycleById(id);

      setCycle(response.cycle);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load cycle details."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= INCREASE QUANTITY =================

  const increaseQuantity = () => {
    if (cycle && quantity < cycle.stock) {
      setQuantity(quantity + 1);
    }
  };

  // ================= DECREASE QUANTITY =================

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ================= CHECK LOGIN =================

  const requireLogin = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return false;
    }

    return true;
  };

  // ================= ADD FAVOURITE =================

  const handleFavourite = async () => {
    if (!requireLogin()) return;

    try {
      setActionLoading(true);
      setMessage("");
      setActionError("");

      const response = await addFavourite(cycle._id);

      setMessage(
        response.message ||
          "Added to favourites successfully."
      );
    } catch (error) {
      setActionError(
        error.response?.data?.message ||
          "Failed to add favourite."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ================= ADD CART =================

  const handleAddToCart = async () => {
    if (!requireLogin()) return;

    try {
      setActionLoading(true);
      setMessage("");
      setActionError("");

      const response = await addToCart(
        cycle._id,
        quantity
      );

      setMessage(
        response.message ||
          "Added to cart successfully."
      );
    } catch (error) {
      setActionError(
        error.response?.data?.message ||
          "Failed to add cycle to cart."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ================= BUY NOW =================

  const handleBuyNow = () => {
    if (!requireLogin()) return;

    // Checkout flow पुढच्या step मध्ये connect करू
    console.log("Buy now:", {
      cycleId: cycle._id,
      quantity,
    });
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            🚴
          </div>

          <Loader />

        </div>
      </main>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-4xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-2xl font-bold text-red-500">
            Something went wrong
          </h2>

          <p className="mt-2 leading-6 text-[var(--color-text)]">
            {error}
          </p>

          <Link
            to="/cycles"
            className="mt-6 inline-flex rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
          >
            ← Back to Cycles
          </Link>

        </div>

      </main>
    );
  }

  // ================= CYCLE NOT FOUND =================

  if (!cycle) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-bg)] text-4xl">
            🚲
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-dark-blue)]">
            Cycle Not Found
          </h2>

          <Link
            to="/cycles"
            className="mt-6 inline-flex rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[var(--color-dark-blue)]"
          >
            ← Back to Cycles
          </Link>

        </div>

      </main>
    );
  }

  const isOutOfStock = cycle.stock <= 0;

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= BACK ================= */}

        <Link
          to="/cycles"
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 font-semibold text-[var(--color-primary)] transition hover:bg-white hover:text-[var(--color-dark-blue)]"
        >
          ← Back to Cycles
        </Link>


        {/* ================= MAIN CARD ================= */}

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= IMAGE ================= */}

            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[var(--color-bg)] p-6 sm:p-10 lg:min-h-[600px]">

              {/* Image decoration */}

              <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-white/60 blur-2xl" />

              <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />

              <img
                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
                alt={cycle.name}
                className="relative z-10 max-h-[500px] w-full object-contain p-4 transition duration-500 hover:scale-105"
              />

              {/* Category */}

              <div className="absolute left-6 top-6 z-20 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] shadow-md">
                {cycle.category}
              </div>

            </div>


            {/* ================= DETAILS ================= */}

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

              {/* Category */}

              <span className="w-fit rounded-full bg-[var(--color-bg)] px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
                {cycle.category}
              </span>


              {/* Name */}

              <h1 className="mt-5 text-3xl font-bold leading-tight text-[var(--color-dark-blue)] sm:text-4xl">
                {cycle.name}
              </h1>


              {/* Brand */}

              <p className="mt-3 text-[var(--color-text)]">
                Brand:{" "}
                <span className="font-bold text-[var(--color-dark-blue)]">
                  {cycle.brand}
                </span>
              </p>


              {/* Price */}

              <div className="mt-7">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Price
                </p>

                <p className="mt-1 text-4xl font-bold text-[var(--color-primary)]">
                  ₹{cycle.price?.toLocaleString("en-IN")}
                </p>

              </div>


              {/* Divider */}

              <div className="my-7 border-t border-gray-100" />


              {/* Description */}

              <div>

                <h2 className="text-lg font-bold text-[var(--color-dark-blue)]">
                  Description
                </h2>

                <p className="mt-2 leading-7 text-[var(--color-text)]">
                  {cycle.description}
                </p>

              </div>


              {/* Stock */}

              <div className="mt-6">

                {isOutOfStock ? (

                  <div className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-500">
                    <span>●</span>
                    Out of Stock
                  </div>

                ) : (

                  <div className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-600">
                    <span>●</span>
                    {cycle.stock} items available
                  </div>

                )}

              </div>


              {/* ================= QUANTITY ================= */}

              {!isOutOfStock && (
                <div className="mt-6">

                  <p className="mb-2 text-sm font-bold text-[var(--color-dark-blue)]">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">

                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-11 w-11 items-center justify-center text-xl font-medium transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="flex h-11 min-w-14 items-center justify-center border-x border-gray-200 bg-white px-4 font-bold text-[var(--color-dark-blue)]">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= cycle.stock}
                      className="flex h-11 w-11 items-center justify-center text-xl font-medium transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>

                  </div>

                </div>
              )}


              {/* ================= ACTION BUTTONS ================= */}

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Favourite */}

                <button
                  onClick={handleFavourite}
                  disabled={actionLoading}
                  className="rounded-xl border-2 border-[var(--color-primary)] px-5 py-3.5 font-bold text-[var(--color-primary)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {actionLoading
                    ? "Please wait..."
                    : "❤️ Favourite"}
                </button>


                {/* Cart */}

                <button
                  onClick={handleAddToCart}
                  disabled={
                    isOutOfStock ||
                    actionLoading
                  }
                  className="rounded-xl bg-[var(--color-primary)] px-5 py-3.5 font-bold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {actionLoading
                    ? "Adding..."
                    : "🛒 Add to Cart"}
                </button>

              </div>


              {/* Buy Now */}

             

              {/* ================= SUCCESS MESSAGE ================= */}

              {message && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  <span>✓</span>
                  <span>{message}</span>
                </div>
              )}


              {/* ================= ERROR MESSAGE ================= */}

              {actionError && (
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  <span>⚠️</span>
                  <span>{actionError}</span>
                </div>
              )}

            </div>

          </div>

        </div>


        {/* ================= TRUST SECTION ================= */}

        <div className="mt-7 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="text-2xl">🚚</div>
            <p className="mt-2 font-bold text-[var(--color-dark-blue)]">
              Easy Shopping
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Simple and convenient
            </p>
          </div>


          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="text-2xl">🔒</div>
            <p className="mt-2 font-bold text-[var(--color-dark-blue)]">
              Secure Experience
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Shop with confidence
            </p>
          </div>


          <div className="rounded-2xl bg-white p-5 text-center shadow-md">
            <div className="text-2xl">🚴</div>
            <p className="mt-2 font-bold text-[var(--color-dark-blue)]">
              Ride With CycleHub
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Find your perfect cycle
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}

export default CycleDetails;
