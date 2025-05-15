import React, { createContext } from "react";
import { Auth0Provider, useAuth0, AppState } from "@auth0/auth0-react";
import { AuthContextProps } from "./AuthContextTypes";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Env vars with fallback empty strings
  const domain = import.meta.env.VITE_AUTH0_DOMAIN || "";
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "";

  const navigate = useNavigate();

  // Match the expected callback signature by Auth0Provider:
  // (appState?: AppState) => void
  const onRedirectCallback = (appState?: AppState) => {
    const redirectTo =
      sessionStorage.getItem("redirectTo") ||
      appState?.returnTo ||
      window.location.pathname;

    sessionStorage.removeItem("redirectTo"); // Clean up after redirection
    navigate(redirectTo);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        ...(import.meta.env.VITE_AUTH0_AUDIENCE && {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }),
        scope: import.meta.env.VITE_AUTH_SCOPES,
      }}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </Auth0Provider>
  );
};

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithRedirect,
        logout,
        isLoading,
        getAccessTokenSilently,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
