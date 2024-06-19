import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLogin = true;

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
