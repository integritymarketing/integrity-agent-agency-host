import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextProps } from "./AuthContextTypes";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
