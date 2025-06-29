import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  notifications: [],

  // Actions
  addNotification: (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: "info",
      title: "",
      message: "",
      duration: 5000,
      ...notification,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Convenience methods
  showSuccess: (message, title = "Success") => {
    return get().addNotification({
      type: "success",
      title,
      message,
    });
  },

  showError: (message, title = "Error") => {
    return get().addNotification({
      type: "error",
      title,
      message,
      duration: 8000, // Longer duration for errors
    });
  },

  showWarning: (message, title = "Warning") => {
    return get().addNotification({
      type: "warning",
      title,
      message,
    });
  },

  showInfo: (message, title = "Info") => {
    return get().addNotification({
      type: "info",
      title,
      message,
    });
  },
}));

export default useNotificationStore;
