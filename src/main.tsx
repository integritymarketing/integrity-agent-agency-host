import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./scss/globalDefines.scss";
import "./styles/variables.css";
import App from "./App";



createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
