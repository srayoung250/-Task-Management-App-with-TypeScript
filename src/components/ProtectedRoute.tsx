import type { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
};
