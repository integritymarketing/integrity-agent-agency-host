import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "@/routes/AppRoutes.tsx";
import { AuthProvider } from "./contexts/auth0Provider/AuthContext";
import { AgentGlobalProvider } from "@/contexts";
import ErrorBoundary from "@/components/ErrorBoundary";


function App() {
    return (
        <>
        <div className="card">
            <h1>Host Application</h1>
        </div>
        <div className="App">
            <ErrorBoundary>
                <BrowserRouter>
                    <AuthProvider>
                        <AgentGlobalProvider>
                            <AppRoutes />
                        </AgentGlobalProvider>
                    </AuthProvider>
                </BrowserRouter>
            </ErrorBoundary>
        </div>
        </>
    );
}


export default App;
