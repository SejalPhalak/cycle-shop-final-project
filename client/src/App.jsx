import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import AdminRoute from "./components/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cycles from "./pages/Cycles";
import CycleDetails from "./pages/CycleDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

// User Pages
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

// Admin Pages
import AdminCycles from "./pages/AdminCycles";
import AddCycle from "./pages/AddCycle";
import EditCycle from "./pages/EditCycle";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cycles"
          element={<Cycles />}
        />

        <Route
          path="/cycles/:id"
          element={<CycleDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* Guest Routes */}

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


        {/* Protected User Routes */}

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


        {/* Admin Routes */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin/cycles"
            element={<AdminCycles />}
          />

          <Route
            path="/admin/cycles/add"
            element={<AddCycle />}
          />

          <Route
            path="/admin/cycles/edit/:id"
            element={<EditCycle />}
          />

        </Route>


        {/* 404 Page */}

        <Route
          path="*"
          element={
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg)] px-4">

              <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

                <div className="mb-4 text-6xl">
                  🚲
                </div>

                <h1 className="text-7xl font-extrabold text-[var(--color-primary)]">
                  404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-[var(--color-dark-blue)]">
                  Page Not Found
                </h2>

                <p className="mt-2 text-[var(--color-text)]">
                  The page you are looking for does not exist.
                </p>

                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="mt-7 rounded-xl bg-[var(--color-primary)] px-7 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-[var(--color-dark-blue)] hover:shadow-lg"
                >
                  Go Home
                </button>

              </div>

            </div>
          }
        />

      </Routes>

      {/* Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
/**
 * Process component logic for App.jsx
 */

// update code for App.jsx
