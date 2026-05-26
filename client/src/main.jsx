import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import App from "./App";

import "./index.css";

import AuthProvider from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        {/* GLOBAL TOAST */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{

            duration: 4000,

            style: {
              background: "#ffffff",
              color: "#111827",
              borderRadius: "18px",
              padding: "16px",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            },

            success: {
              iconTheme: {
                primary: "#4f46e5",
                secondary: "#ffffff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },

          }}
        />

        <App />

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);