import { useMemo } from "react";
import Cookies from "universal-cookie";

const usePortalUrl = (): string => {
  const cookies = useMemo(() => new Cookies(), []);

  return useMemo(() => {
    // Prefer environment variable first
    const envUrl = import.meta.env.VITE_PORTAL_URL as string | undefined;
    if (envUrl && envUrl.trim() !== "") {
      return envUrl;
    }

    // Then check cookies
    const portalCookie = cookies.get("portal_url");
    if (portalCookie && portalCookie.trim() !== "") {
      return portalCookie;
    }

    const clientCookie = cookies.get("client_url");
    if (clientCookie && clientCookie.trim() !== "") {
      return clientCookie;
    }

    // Default fallback URL
    return "https://clients.integrity.com";
  }, [cookies]);
};

export default usePortalUrl;
