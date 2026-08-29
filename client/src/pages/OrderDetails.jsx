import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        const response = await getOrderById(id);

        if (response.success) {
          setOrder(response.order);
        } else {
          setError(response.message || "Order not found");
        }
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // ================= LOADING =================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
            📦
          </div>

          <p className="text-lg font-semibold text-[var(--color-dark-blue)]">
            Loading order details...
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Please wait a moment
          </p>

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

          <h2 className="mt-5 text-2xl font-bold text-[var(--color-dark-blue)]">
            Unable to Load Order
          </h2>

          <p className="mt-2 leading-6 text-[var(--color-text)]">
            {error}
          </p>

          <button
            onClick={() => navigate("/orders")}
            className="mt-6 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
          >
            ← Back to My Orders
          </button>

        </div>

      </main>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-primary)] shadow-sm">
              <span>📦</span>
              Order Summary
            </div>

            <h1 className="text-3xl font-bold text-[var(--color-dark-blue)] sm:text-4xl">
              Order Details
            </h1>

            <p className="mt-2 break-all text-sm text-[var(--color-text)]">
              Order ID:{" "}
              <span className="font-semibold text-[var(--color-dark-blue)]">
                {order._id}
              </span>
            </p>

          </div>


          <button
            onClick={() => navigate("/orders")}
            className="rounded-xl border-2 border-[var(--color-primary)] bg-white px-5 py-3 font-semibold text-[var(--color-primary)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-md"
          >
            ← Back to My Orders
          </button>

        </div>


        {/* ================= ORDER INFORMATION ================= */}

        <section className="mb-7 overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Section Header */}

          <div className="border-b border-gray-100 px-6 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-bg)] text-xl">
                📋
              </div>

              <div>

                <h2 className="text-xl font-bold text-[var(--color-dark-blue)]">
                  Order Information
                </h2>

                <p className="text-sm text-gray-500">
                  Summary of your order
                </p>

              </div>

            </div>

          </div>


          {/* Information Grid */}

          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 md:grid-cols-4 sm:p-7">

            {/* Date */}

            <div className="rounded-2xl bg-[var(--color-bg)] p-4">

              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                📅
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Order Date
              </p>

              <p className="mt-1 font-bold text-[var(--color-dark-blue)]">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

            </div>


            {/* Payment Status */}

            <div className="rounded-2xl bg-[var(--color-bg)] p-4">

              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                💳
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Payment Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                  order.paymentStatus === "Paid"
                    ? "bg-green-50 text-green-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {order.paymentStatus || "Pending"}
              </span>

            </div>


            {/* Order Status */}

            <div className="rounded-2xl bg-[var(--color-bg)] p-4">

              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                🚚
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Order Status
              </p>

              <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                {order.orderStatus || "Pending"}
              </span>

            </div>


            {/* Total */}

            <div className="rounded-2xl bg-[var(--color-dark-blue)] p-4 text-white">

              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                💰
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                Total Amount
              </p>

              <p className="mt-1 text-2xl font-bold">
                ₹{order.totalAmount?.toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </section>


        {/* ================= ORDERED CYCLES ================= */}

        <section className="overflow-hidden rounded-3xl bg-white shadow-lg">

          {/* Section Header */}

          <div className="border-b border-gray-100 px-6 py-5 sm:px-7">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-bg)] text-xl">
                  🚲
                </div>

                <div>

                  <h2 className="text-xl font-bold text-[var(--color-dark-blue)]">
                    Ordered Cycles
                  </h2>

                  <p className="text-sm text-gray-500">
                    Items included in this order
                  </p>

                </div>

              </div>

              <div className="hidden rounded-full bg-[var(--color-bg)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] sm:block">
                {order.items?.length || 0}{" "}
                {order.items?.length === 1 ? "Item" : "Items"}
              </div>

            </div>

          </div>


          {/* Items */}

          <div className="space-y-5 p-6 sm:p-7">

            {order.items?.map((item, index) => {

              const cycle = item.cycle || item.cycleId;

              const price =
                item.price || cycle?.price || 0;

              const quantity =
                item.quantity || 1;

              const subtotal = price * quantity;

              return (
                <div
                  key={item._id || index}
                  className="group rounded-2xl border border-gray-100 bg-[var(--color-bg)] p-4 transition duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-md sm:p-5"
                >

                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* ================= IMAGE ================= */}

                    <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-2xl bg-white sm:h-36 sm:w-40">

                      {cycle?.image ? (

                        <img
                          src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
                          alt={cycle.name}
                          className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No Image
                        </div>

                      )}

                    </div>


                    {/* ================= DETAILS ================= */}

                    <div className="flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <h3 className="text-xl font-bold text-[var(--color-dark-blue)]">
                            {cycle?.name || "Cycle"}
                          </h3>

                          {cycle?.brand && (
                            <p className="mt-1 text-sm text-[var(--color-text)]">
                              Brand: {cycle.brand}
                            </p>
                          )}

                        </div>


                        <div className="rounded-xl bg-white px-4 py-2 text-left shadow-sm sm:text-right">

                          <p className="text-xs font-medium text-gray-400">
                            Subtotal
                          </p>

                          <p className="text-lg font-bold text-[var(--color-primary)]">
                            ₹{subtotal?.toLocaleString("en-IN")}
                          </p>

                        </div>

                      </div>


                      {/* Item Information */}

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                        {/* Price */}

                        <div className="rounded-xl bg-white p-3">

                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Price
                          </p>

                          <p className="mt-1 font-bold text-[var(--color-dark-blue)]">
                            ₹{price?.toLocaleString("en-IN")}
                          </p>

                        </div>


                        {/* Quantity */}

                        <div className="rounded-xl bg-white p-3">

                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Quantity
                          </p>

                          <p className="mt-1 font-bold text-[var(--color-dark-blue)]">
                            {quantity}
                          </p>

                        </div>


                        {/* Subtotal */}

                        <div className="col-span-2 rounded-xl bg-white p-3 sm:col-span-1">

                          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Item Total
                          </p>

                          <p className="mt-1 font-bold text-[var(--color-primary)]">
                            ₹{subtotal?.toLocaleString("en-IN")}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>


          {/* ================= TOTAL ================= */}

          <div className="border-t border-gray-100 px-6 py-6 sm:px-7">

            <div className="flex flex-col gap-4 rounded-2xl bg-[var(--color-dark-blue)] p-5 text-white sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm text-white/60">
                  Order Total
                </p>

                <p className="mt-1 text-lg font-semibold">
                  Final amount for this order
                </p>

              </div>

              <p className="text-3xl font-bold">
                ₹{order.totalAmount?.toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

export default OrderDetails;

