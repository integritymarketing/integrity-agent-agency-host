import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@/contexts/auth0Provider/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouterSwitch from "@/routes/RouterSwitch";
import { RoleProvider } from "@/contexts/roleProvider/RoleContext";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <RoleProvider>
            <RouterSwitch />
          </RoleProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
