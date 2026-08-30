
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;


// update code for AdminRoute.jsx

// update code for AdminRoute.jsx
