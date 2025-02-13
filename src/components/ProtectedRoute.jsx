import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Prevents flashing

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
