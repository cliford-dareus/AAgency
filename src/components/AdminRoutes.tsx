import { Navigate, Outlet } from "react-router-dom";

function AdminRoutes() {
  const isLogin = true;
  const isAdmin = true;
  
  return isLogin && isAdmin ? <Outlet /> : <Navigate to="/schedule" />;
}

export default AdminRoutes;