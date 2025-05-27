import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/auth0Provider/AuthContext";
import { AgentGlobalProvider } from "./contexts";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./Layout";

function App() {
    return (
        <Layout>
            <ErrorBoundary>
                <BrowserRouter>
                    <AuthProvider>
                        <AgentGlobalProvider>
                            <AppRoutes />
                        </AgentGlobalProvider>
                    </AuthProvider>
                </BrowserRouter>
            </ErrorBoundary>
        </Layout>
    );
}

export default App;