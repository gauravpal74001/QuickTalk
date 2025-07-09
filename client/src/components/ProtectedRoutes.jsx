import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, children, redirect  }) => {
  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return children || <Outlet />;
}; 