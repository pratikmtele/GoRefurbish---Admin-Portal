export { AuthProvider, useAuth } from "./AuthContext";
export { ThemeProvider, useTheme } from "./ThemeContext";
export { AppProvider, useApp, NOTIFICATION_TYPES } from "./AppContext";

import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { AppProvider } from "./AppContext";

export const CombinedProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>{children}</AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
