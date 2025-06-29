import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (
        (credentials.email === "admin@gorefurbish.com" &&
          credentials.password === "admin123") ||
        (credentials.email === "staff@gorefurbish.com" &&
          credentials.password === "staff123")
      ) {
        const userData = {
          id: 1,
          name: credentials.email.includes("admin")
            ? "Admin User"
            : "Staff User",
          email: credentials.email,
          role: credentials.email.includes("admin") ? "admin" : "staff",
          avatar:
            "https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff",
        };

        setUser(userData);
        setIsAuthenticated(true);

        // Store in localStorage for persistence
        localStorage.setItem("authToken", "mock-token");
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  // Check if user is already logged in (on app load)
  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        logout();
      }
    }
  };

  // Initialize auth status
  React.useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
