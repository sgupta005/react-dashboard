import { useUser } from "@/features/authentication/useUser";
import { LoadingSpinner } from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
