import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";
import Loader from "../components/Loader";

function Checkout() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // =========================
  // GET CART
  // =========================

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
          "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      setError("");

      // Backend only needs items
      const orderData = {
        items: items.map((item) => ({
          cycleId: item.cycle._id,
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(orderData);

      console.log("Order Response:", response);

      if (response.success) {
        setOrderId(response.order._id);
        setShowSuccess(true);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <Loader />;
  }

  // =========================
  // ERROR
  // =========================

  if (error && items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-md">

          <p className="mb-4 text-red-500">
            {error}
          </p>

          <button
            onClick={() => navigate("/cart")}
            className="rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white hover:bg-[var(--color-dark-blue)]"
          >
            Back to Cart
          </button>

        </div>
      </div>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-4">

        <h1 className="mb-3 text-3xl font-bold text-[var(--color-dark-blue)]">
          Your Cart is Empty
        </h1>

        <p className="mb-6 text-gray-600">
          Add some cycles before proceeding to checkout.
        </p>

        <button
          onClick={() => navigate("/cycles")}
          className="rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-dark-blue)]"
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  // =========================
  // SUCCESS POPUP
  // =========================

  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            🎉
          </div>

          <h1 className="mb-3 text-3xl font-bold text-[var(--color-dark-blue)]">
            Order Placed Successfully!
          </h1>

          <p className="mb-5 text-gray-600">
            Your order has been confirmed.
          </p>

          <div className="mb-6 rounded-lg bg-[var(--color-bg)] p-4">

            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="mt-1 break-all font-semibold text-[var(--color-dark-blue)]">
              {orderId}
            </p>

          </div>

          <button
            onClick={() => navigate("/cycles")}
            className="w-full rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-dark-blue)]"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-4 py-8">

      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADING
        ========================= */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] md:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-600">
            Review your order and place it.
          </p>

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}


        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="grid gap-8 lg:grid-cols-3">


          {/* =========================
              ORDER ITEMS
          ========================= */}

          <div className="lg:col-span-2">

            <div className="rounded-2xl bg-white p-5 shadow-md md:p-6">

              <h2 className="mb-6 text-xl font-bold text-[var(--color-text)]">
                Order Items
              </h2>


              <div className="space-y-5">

                {items.map((item) => {

                  const cycle = item.cycle;

                  const subtotal =
                    (cycle?.price || 0) * item.quantity;

                  return (

                    <div
                      key={item._id || cycle?._id}
                      className="grid grid-cols-1 gap-5 border-b pb-5 md:grid-cols-[minmax(0,1fr)_140px] md:items-center"
                    >


                      {/* =========================
                          CYCLE INFO
                      ========================= */}

                      <div className="flex min-w-0 items-center gap-4">


                        {/* =========================
                            IMAGE
                        ========================= */}

                        <div className="flex h-32 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-36 sm:w-48 md:h-40 md:w-52">

                          <img
                            src={`${import.meta.env.VITE_API_URL.replace(
                              "/api",
                              ""
                            )}/uploads/${cycle.image}`}
                            alt={cycle.name}
                            className="h-full w-full object-contain"
                          />

                        </div>


                        {/* =========================
                            DETAILS
                        ========================= */}

                        <div className="min-w-0 flex-1">

                          <h3 className="break-words text-base font-semibold text-[var(--color-text)] sm:text-lg">
                            {cycle?.name}
                          </h3>

                          <p className="mt-2 text-sm text-gray-500">
                            Brand: {cycle?.brand}
                          </p>

                          <p className="mt-2 text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>

                        </div>

                      </div>


                      {/* =========================
                          PRICE
                      ========================= */}

                      <div className="w-full border-t pt-3 text-left md:border-t-0 md:pt-0 md:text-right">

                        <p className="text-sm text-gray-500">
                          ₹{cycle?.price} × {item.quantity}
                        </p>

                        <p className="mt-1 text-lg font-bold text-[var(--color-primary)]">
                          ₹{subtotal}
                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div>

            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-md">

              <h2 className="mb-6 text-xl font-bold text-[var(--color-text)]">
                Order Summary
              </h2>


              {/* =========================
                  ITEMS
              ========================= */}

              <div className="mb-4 flex justify-between text-gray-600">

                <span>
                  Items
                </span>

                <span>
                  {items.length}
                </span>

              </div>


              {/* =========================
                  TOTAL
              ========================= */}

              <div className="border-t pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold text-[var(--color-text)]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    ₹{totalAmount}
                  </span>

                </div>

              </div>


              {/* =========================
                  PAYMENT
              ========================= */}

              <div className="mt-5 rounded-lg bg-[var(--color-bg)] p-4">

                <p className="font-semibold text-[var(--color-text)]">
                  Payment
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  No online payment required.
                </p>

              </div>


              {/* =========================
                  PLACE ORDER
              ========================= */}

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="mt-6 w-full rounded-lg bg-[var(--color-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-dark-blue)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>


              {/* =========================
                  BACK TO CART
              ========================= */}

              <button
                onClick={() => navigate("/cart")}
                disabled={placingOrder}
                className="mt-3 w-full rounded-lg border border-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-bg)]"
              >
                Back to Cart
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;