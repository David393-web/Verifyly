import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportScam from "./pages/ReportScam";
import Settings from "./pages/Settings";
import SubmittedCases from "./pages/SubmittedCases";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-[#dfe7ff]">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/report-scam"
          element={
            <ProtectedRoute>
              <ReportScam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submitted-cases"
          element={
            <ProtectedRoute>
              <SubmittedCases />
            </ProtectedRoute>
          }
        />

        
      </Routes>
    </div>
  );
}

export default App;
