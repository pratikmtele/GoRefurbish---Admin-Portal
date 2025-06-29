import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Import Zustand stores
import { useAuthStore } from "./stores";

// Import components
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProductManagement from "./Pages/ProductManagement";
import UserManagement from "./Pages/UserManagement";
import StaffManagement from "./Pages/StaffManagement";
import PaymentManagement from "./Pages/PaymentManagement";
import Settings from "./Pages/Settings";
import Layout from "./Components/Layout";
import NotificationSystem from "./Components/NotificationSystem";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main App Component
const App = () => {
  const { initialize } = useAuthStore();

  // Initialize auth state on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/staff" element={<StaffManagement />} />
                  <Route path="/payments" element={<PaymentManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <NotificationSystem />
    </div>
  );
};

export default App;
