import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCart,
  updateCart,
  removeFromCart,
} from "../services/cartService";

import Loader from "../components/Loader";

function Cart() {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  // ================= GET CART =================
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCart();

      setItems(response.items || []);
      setTotalAmount(response.totalAmount || 0);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load cart."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE QUANTITY =================
  const handleUpdateQuantity = async (
    cycleId,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      setActionLoading(true);
      setError("");

      const response = await updateCart(
        cycleId,
        quantity
      );

      setItems(response.items || []);
      setTotalAmount(response.totalAmount || 0);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update cart."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ================= REMOVE ITEM =================
  const handleRemove = async (cycleId) => {
    try {
      setActionLoading(true);
      setError("");

      const response = await removeFromCart(cycleId);

      setItems(response.items || []);
      setTotalAmount(response.totalAmount || 0);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to remove item."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            🛒
          </div>

          <Loader />
        </div>
      </main>
    );
  }

  // ================= ERROR =================
  if (error && items.length === 0) {
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

          <button
            onClick={fetchCart}
            className="mt-6 rounded-xl bg-[var(--color-primary)] px-7 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
          >
            Try Again
          </button>

        </div>

      </main>
    );
  }

  // ================= EMPTY CART =================
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg)] px-4 py-12 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-xl">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--color-bg)] text-5xl">
              🛒
            </div>

            <h1 className="mt-7 text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md leading-6 text-[var(--color-text)]">
              Looks like you haven't added any cycles
              to your cart yet.
            </p>

            <Link
              to="/cycles"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-7 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
            >
              🚲 Browse Cycles
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">
              🛒
            </span>

            <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Shopping Cart
            </p>
          </div>

          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl">
            My Cart
          </h1>

          <p className="mt-2 text-[var(--color-text)]">
            {items.length}{" "}
            {items.length === 1 ? "item" : "items"} in your cart
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}


        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">

          {/* ================= ITEMS ================= */}

          <div className="space-y-5 lg:col-span-2">

            {items.map((item) => {

              const cycle =
                item.cycle || item.cycleId;

              if (!cycle) {
                return null;
              }

              const cycleId = cycle._id;

              const quantity = item.quantity || 1;

              const price = cycle.price || 0;

              const subtotal = price * quantity;

              return (
                <div
                  key={cycleId}
                  className="group overflow-hidden rounded-3xl bg-white p-4 shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-5"
                >

                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* ================= IMAGE ================= */}

                    <div className="relative flex h-52 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-bg)] sm:h-40 sm:w-40">

                      <img
                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
                        alt={cycle.name}
                        className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                      />

                    </div>


                    {/* ================= DETAILS ================= */}

                    <div className="flex flex-1 flex-col justify-between">

                      <div>

                        <div className="flex items-start justify-between gap-3">

                          <div>

                            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                              {cycle.category}
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-[var(--color-dark-blue)]">
                              {cycle.name}
                            </h2>

                            <p className="mt-1 text-sm text-[var(--color-text)]">
                              Brand: {cycle.brand}
                            </p>

                          </div>

                          <div className="rounded-xl bg-[var(--color-bg)] px-3 py-2 text-right">
                            <p className="text-xs text-gray-500">
                              Price
                            </p>

                            <p className="font-bold text-[var(--color-primary)]">
                              ₹{price.toLocaleString("en-IN")}
                            </p>
                          </div>

                        </div>

                      </div>


                      {/* ================= BOTTOM ================= */}

                      <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                        {/* Quantity */}

                        <div>

                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Quantity
                          </p>

                          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

                            {/* <button
                              disabled={
                                actionLoading ||
                                quantity <= 1
                              }
                              onClick={() =>
                                handleUpdateQuantity(
                                  cycleId,
                                  quantity - 1
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center text-xl font-medium transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              −
                            </button> */}

                            <span className="flex h-10 min-w-12 items-center justify-center border-x border-gray-200 bg-white px-4 font-bold text-[var(--color-dark-blue)]">
                              {quantity}
                            </span>

                            {/* <button
                              disabled={
                                actionLoading ||
                                quantity >= cycle.stock
                              }
                              onClick={() =>
                                handleUpdateQuantity(
                                  cycleId,
                                  quantity + 1
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center text-xl font-medium transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              +
                            </button> */}

                          </div>

                        </div>


                        {/* Subtotal + Remove */}

                        <div className="flex items-center justify-between gap-6 sm:justify-end">

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                              Subtotal
                            </p>

                            <p className="text-xl font-bold text-[var(--color-dark-blue)]">
                              ₹{subtotal.toLocaleString("en-IN")}
                            </p>
                          </div>

                          <button
                            disabled={actionLoading}
                            onClick={() =>
                              handleRemove(cycleId)
                            }
                            className="rounded-lg px-2 py-2 font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                          >
                            🗑️ Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <div className="h-fit rounded-3xl bg-white p-6 shadow-xl lg:sticky lg:top-24">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-bg)] text-xl">
                🧾
              </div>

              <div>
                <h2 className="text-xl font-bold text-[var(--color-dark-blue)]">
                  Order Summary
                </h2>

                <p className="text-xs text-gray-500">
                  Your cart details
                </p>
              </div>

            </div>


            <div className="my-6 border-t border-gray-100" />


            <div className="flex items-center justify-between text-[var(--color-text)]">

              <span>
                Items
              </span>

              <span className="font-semibold text-[var(--color-dark-blue)]">
                {items.length}
              </span>

            </div>


            <div className="mt-5 rounded-2xl bg-[var(--color-bg)] p-4">

              <div className="flex items-center justify-between">

                <span className="font-bold text-[var(--color-dark-blue)]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>

              </div>

            </div>


            <div className="my-6 border-t border-gray-100" />


            {/* Checkout */}

            <Link
              to="/checkout"
              className="block w-full rounded-xl bg-[var(--color-primary)] px-5 py-3.5 text-center font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
            >
              Proceed to Checkout →
            </Link>


            {/* Continue Shopping */}

            <Link
              to="/cycles"
              className="mt-3 block w-full rounded-xl border-2 border-[var(--color-primary)] px-5 py-3 text-center font-semibold text-[var(--color-primary)] transition duration-200 hover:bg-[var(--color-bg)]"
            >
              ← Continue Shopping
            </Link>


            <div className="mt-5 text-center">

              <p className="text-xs text-gray-400">
                🚴 Happy riding with CycleHub
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Cart;

