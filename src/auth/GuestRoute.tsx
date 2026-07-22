import { Navigate } from "react-router";
import { useAuth } from "./../contexts/AuthContext";

type GuestRouteProps = {
  children: React.ReactNode;
};

export default function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}
