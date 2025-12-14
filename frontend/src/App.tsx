import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SweetsDashboard from "./pages/SweetsDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Smart default redirect */}
      <Route
        path="/"
        element={<Navigate to={token ? "/sweets" : "/login"} />}
      />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sweets"
        element={
          <ProtectedRoute>
            <SweetsDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<h2>404 Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
