import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/common/Loader";

interface GuardProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<GuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loader-container" style={{ minHeight: "50vh" }}>
        <Loader size="large" text="Verifying session..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const AdminRoute: React.FC<GuardProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loader-container" style={{ minHeight: "50vh" }}>
        <Loader size="large" text="Verifying admin credentials..." />
      </div>
    );
  }

  const role = user?.role?.toLowerCase();
  if (!user || (role !== "admin")) {
    return <Navigate to="/login" state={{ from: location, error: "Admin access required." }} replace />;
  }

  return <>{children}</>;
};
