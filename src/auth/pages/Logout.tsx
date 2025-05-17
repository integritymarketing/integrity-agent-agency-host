import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutComponent: React.FC = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    const handleLogout = async (): Promise<void> => {
      try {
        await logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      } catch (error) {
        Sentry.captureException(error, {
          level: "error",
          tags: { feature: "auth-logout" },
          extra: {
            message: "Auth Logout: failed to log out",
          },
        });
      }
    };

    handleLogout();
  }, [logout]);

  return null;
};

export default LogoutComponent;
