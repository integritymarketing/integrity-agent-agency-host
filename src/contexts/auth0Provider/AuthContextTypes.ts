import { User } from "@auth0/auth0-react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null | undefined;
  loginWithRedirect: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  getAccessTokenSilently: () => Promise<string>;
}
