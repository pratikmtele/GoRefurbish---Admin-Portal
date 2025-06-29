import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          // Mock authentication - replace with real API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (
            credentials.email === "admin@gorefurbish.com" &&
            credentials.password === "admin123"
          ) {
            const user = {
              id: 1,
              name: "Admin User",
              email: "admin@gorefurbish.com",
              role: "admin",
              avatar: null,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            localStorage.setItem("adminToken", "mock-admin-token");
            return { success: true, user };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          set({
            error: error.message,
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        localStorage.removeItem("adminToken");
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      // Initialize auth state from token
      initialize: () => {
        const token = localStorage.getItem("adminToken");
        if (token) {
          // Mock user data - in real app, verify token with API
          const user = {
            id: 1,
            name: "Admin User",
            email: "admin@gorefurbish.com",
            role: "admin",
            avatar: null,
          };
          set({ user, isAuthenticated: true });
        }
      },

      updateProfile: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
