import { Routes, Route, Navigate } from "react-router-dom";

// Import context providers
import { CombinedProvider, useAuth } from "./context";

// Import components
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProductManagement from "./Pages/ProductManagement";
import UserManagement from "./Pages/UserManagement";
import StaffManagement from "./Pages/StaffManagement";
import PaymentManagement from "./Pages/PaymentManagement";
import Settings from "./Pages/Settings";
import Layout from "./Components/Layout";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Main App Component
const AppContent = () => {
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
    </div>
  );
};

const App = () => {
  return (
    <CombinedProvider>
      <AppContent />
    </CombinedProvider>
  );
};

export default App;
