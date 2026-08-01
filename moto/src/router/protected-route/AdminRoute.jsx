import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {

  const { isAuth, authStatus, role } = useSelector(s => s.user)

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}