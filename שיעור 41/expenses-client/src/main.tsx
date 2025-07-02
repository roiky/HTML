import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";
import { CartProvider } from "./context/cartContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </ThemeProvider>
    </StrictMode>
);
