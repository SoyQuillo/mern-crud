import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, replace, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();
  console.log(loading, isAuthenticated)

  if(loading) return <h1>Loading...</h1>

  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProtectedRoutes;
