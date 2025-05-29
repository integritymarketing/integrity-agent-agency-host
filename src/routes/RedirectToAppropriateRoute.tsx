import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RedirectToAppropriateRoute: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [searchParams] = useSearchParams();

  const redirectTo: string | null =
    searchParams.get("redirectTo") || sessionStorage.getItem("redirectTo");

  useEffect(() => {
    const target = redirectTo || "/agent/dashboard";

    if (import.meta.env.VITE_BUILD_ENV !== "Production") {
      if (isAuthenticated) {
        navigate(target, { replace: true });
      } else {
        sessionStorage.setItem("redirectTo", target);
        navigate("/welcome", { replace: true });
      }
    } else {
      if (isAuthenticated) {
        navigate(target);
      } else {
        sessionStorage.setItem("redirectTo", target);
        window.location.href = "https://integrity.com";
      }
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return null;
};

export default RedirectToAppropriateRoute;
