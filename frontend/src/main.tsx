import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/Auth.Provider.tsx";
import { CustomThemeProvider } from "./context/ThemeContext.tsx";
import { ChatProvider } from "./context/VideoCallContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AuthProvider>
    </CustomThemeProvider>
  </StrictMode>
);
