import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getOrders } from "../services/orderService";
import Loader from "../components/Loader";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();

      if (response.success) {
        setOrders(response.orders || []);
      } else {
        setError(response.message || "Failed to load orders");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] shadow-sm">
            <span>📦</span>
            <span>Order History</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-dark-blue)] sm:text-5xl">
            My Orders
          </h1>

          <p className="mt-3 max-w-2xl text-base text-[var(--color-text)] sm:text-lg">
            Track your previous purchases and view complete order details.
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600 shadow-sm">

            <span className="text-xl">
              ⚠️
            </span>

            <div>
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>

          </div>
        )}


        {/* ================= EMPTY ORDERS ================= */}

        {!error && orders.length === 0 && (
          <div className="overflow-hidden rounded-3xl bg-white px-6 py-16 text-center shadow-lg">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-bg)] text-5xl">
              📦
            </div>

            <h2 className="mt-7 text-2xl font-bold text-[var(--color-dark-blue)] sm:text-3xl">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[var(--color-text)]">
              You haven't placed any orders yet. Explore our collection
              and find your perfect ride.
            </p>

            <button
              onClick={() => navigate("/cycles")}
              className="mt-7 rounded-xl bg-[var(--color-primary)] px-7 py-3 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
            >
              🚴 Start Shopping
            </button>

          </div>
        )}


        {/* ================= ORDERS ================= */}

        {orders.length > 0 && (
          <div className="space-y-7">

            {orders.map((order) => (

              <div
                key={order._id}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* ================= ORDER HEADER ================= */}

                <div className="border-b border-gray-100 bg-gradient-to-r from-white to-[var(--color-bg)] p-5 sm:p-6">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          🧾
                        </span>

                        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                          Order ID
                        </p>
                      </div>

                      <p className="mt-2 break-all text-sm font-semibold text-[var(--color-dark-blue)] sm:text-base">
                        {order._id}
                      </p>

                    </div>


                    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">

                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Order Date
                      </p>

                      <p className="mt-1 font-semibold text-[var(--color-text)]">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN")}
                      </p>

                    </div>

                  </div>

                </div>


                {/* ================= ITEMS ================= */}

                <div className="p-5 sm:p-6">

                  <div className="mb-5 flex items-center justify-between">

                    <h3 className="text-lg font-bold text-[var(--color-dark-blue)]">
                      Ordered Cycles
                    </h3>

                    <span className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "Item"
                        : "Items"}
                    </span>

                  </div>


                  <div className="space-y-4">

                    {order.items.map((item, index) => {

                      const cycle = item.cycle;

                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-[var(--color-bg)] p-4 transition duration-300 hover:border-[var(--color-secondary)] hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                        >

                          {/* ================= IMAGE + INFO ================= */}

                          <div className="flex min-w-0 items-center gap-4">

                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm sm:h-28 sm:w-28">

                              {cycle?.image ? (
                                <img
                                  src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
                                  alt={cycle.name}
                                  className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="text-center text-xs text-gray-400">
                                  No Image
                                </div>
                              )}

                            </div>


                            <div className="min-w-0">

                              <h4 className="truncate text-lg font-bold text-[var(--color-dark-blue)]">
                                {cycle?.name || "Cycle"}
                              </h4>

                              {cycle?.brand && (
                                <p className="mt-1 text-sm text-[var(--color-text)]">
                                  {cycle.brand}
                                </p>
                              )}

                              <div className="mt-3 flex flex-wrap gap-2">

                                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                                  Qty: {item.quantity}
                                </span>

                                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                                  ₹{item.price} / item
                                </span>

                              </div>

                            </div>

                          </div>


                          {/* ================= SUBTOTAL ================= */}

                          <div className="border-t border-gray-200 pt-3 text-left sm:border-0 sm:pt-0 sm:text-right">

                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Subtotal
                            </p>

                            <p className="mt-1 text-xl font-bold text-[var(--color-primary)]">
                              ₹{item.price * item.quantity}
                            </p>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                </div>


                {/* ================= FOOTER ================= */}

                <div className="border-t border-gray-100 bg-white p-5 sm:p-6">

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* STATUS */}

                    <div className="flex flex-wrap gap-3">

                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">

                        <span className="h-2 w-2 rounded-full bg-green-500"></span>

                        Payment: {order.paymentStatus}

                      </span>


                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">

                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>

                        Status: {order.orderStatus}

                      </span>

                    </div>


                    {/* TOTAL + BUTTON */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                      <div className="sm:text-right">

                        <p className="text-sm text-gray-500">
                          Total Amount
                        </p>

                        <p className="text-2xl font-bold text-[var(--color-dark-blue)]">
                          ₹{order.totalAmount}
                        </p>

                      </div>


                      <button
                        onClick={() =>
                          navigate(
                            `/orders/${order._id}`
                          )
                        }
                        className="rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
                      >
                        View Details →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}

export default Orders;
