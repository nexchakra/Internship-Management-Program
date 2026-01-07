import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRole: "ADMIN" | "STUDENT";
}

const RoleProtectedRoute = ({
  children,
  allowedRole
}: RoleProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
