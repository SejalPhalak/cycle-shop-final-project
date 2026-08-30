import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= COMPONENTS =================

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";

// ================= PUBLIC PAGES =================

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cycles from "./pages/Cycles";
import CycleDetails from "./pages/CycleDetails";

// ================= USER PAGES =================

import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

// ================= ADMIN PAGES =================

import AdminCycles from "./pages/AdminCycles";
import AddCycle from "./pages/AddCycle";
import EditCycle from "./pages/EditCycle";

function App() {
  return (
    <BrowserRouter>

      {/* ================= NAVBAR ================= */}

      <Navbar />

      <Routes>

        {/* ================================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cycles"
          element={<Cycles />}
        />

      
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/cycles/:id"
          element={<CycleDetails />}
        />


        {/* ================================================= */}
        {/* GUEST ROUTES */}
        {/* ================================================= */}

        <Route element={<GuestRoute />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Route>


        {/* ================================================= */}
        {/* PROTECTED USER ROUTES */}
        {/* ================================================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/favourites"
            element={<Favourites />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

        </Route>


        {/* ================================================= */}
        {/* ADMIN ROUTES */}
        {/* ================================================= */}

        <Route element={<AdminRoute />}>

          {/* Manage Cycles */}

          <Route
            path="/admin/cycles"
            element={<AdminCycles />}
          />

          {/* Add Cycle */}

          <Route
            path="/admin/cycles/add"
            element={<AddCycle />}
          />

          {/* Edit Cycle */}

          <Route
            path="/admin/cycles/edit/:id"
            element={<EditCycle />}
          />

        </Route>


        {/* ================================================= */}
        {/* 404 */}
        {/* ================================================= */}

        <Route
          path="*"
          element={
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg)] px-4">

              <div className="text-center">

                <h1 className="text-7xl font-bold text-[var(--color-primary)]">
                  404
                </h1>

                <p className="mt-4 text-lg text-[var(--color-text)]">
                  Page not found
                </p>

                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="mt-6 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white"
                >
                  Go Home
                </button>

              </div>

            </div>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;