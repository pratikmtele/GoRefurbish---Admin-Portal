import { create } from "zustand";

const useAppStore = create((set, get) => ({
  // Loading states
  isLoading: false,
  loadingMessage: "",

  // Breadcrumbs
  breadcrumbs: [{ label: "Dashboard", path: "/" }],

  // Theme
  theme: "light",

  // Sidebar state
  sidebarCollapsed: false,

  // Actions
  setLoading: (loading, message = "") => {
    set({ isLoading: loading, loadingMessage: message });
  },

  updateBreadcrumbs: (breadcrumbs) => {
    set({ breadcrumbs });
  },

  addBreadcrumb: (breadcrumb) => {
    const current = get().breadcrumbs;
    const exists = current.find((b) => b.path === breadcrumb.path);

    if (!exists) {
      set({ breadcrumbs: [...current, breadcrumb] });
    }
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },

  setTheme: (theme) => {
    set({ theme });
  },

  toggleSidebar: () => {
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    }));
  },

  setSidebarCollapsed: (collapsed) => {
    set({ sidebarCollapsed: collapsed });
  },

  // Reset app state
  reset: () => {
    set({
      isLoading: false,
      loadingMessage: "",
      breadcrumbs: [{ label: "Dashboard", path: "/" }],
      theme: "light",
      sidebarCollapsed: false,
    });
  },
}));

export default useAppStore;
