import React, { createContext, useContext, useState, useReducer } from "react";

// Create App Context
const AppContext = createContext();

// Custom hook to use app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Initial state for notifications
const initialNotificationState = {
  notifications: [],
};

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.payload, // payload already contains the ID
        ],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

// App Provider Component
export const AppProvider = ({ children }) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );

  const [isLoading, setIsLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Notification functions
  const addNotification = (notification) => {
    const notificationId = Date.now() + Math.random(); // Make ID more unique
    const newNotification = {
      id: notificationId,
      ...notification,
    };

    notificationDispatch({
      type: "ADD_NOTIFICATION",
      payload: newNotification,
    });

    // Auto-remove notification after specified time
    if (notification.autoRemove !== false) {
      const timeout =
        notification.type === NOTIFICATION_TYPES.ERROR ? 8000 : 5000; // Errors stay 8 seconds, others 5 seconds
      setTimeout(() => {
        removeNotification(notificationId);
      }, timeout);
    }
  };

  const removeNotification = (id) => {
    notificationDispatch({
      type: "REMOVE_NOTIFICATION",
      payload: id,
    });
  };

  const clearNotifications = () => {
    notificationDispatch({
      type: "CLEAR_NOTIFICATIONS",
    });
  };

  // Convenience methods for different notification types
  const showSuccess = (message, title = "Success") => {
    addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      title,
      message,
    });
  };

  const showError = (message, title = "Error") => {
    addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      title,
      message,
      // autoRemove: false, // Removed - now errors will auto-close after 5 seconds
    });
  };

  const showWarning = (message, title = "Warning") => {
    addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      title,
      message,
    });
  };

  const showInfo = (message, title = "Info") => {
    addNotification({
      type: NOTIFICATION_TYPES.INFO,
      title,
      message,
    });
  };

  // Breadcrumb functions
  const updateBreadcrumbs = (crumbs) => {
    setBreadcrumbs(crumbs);
  };

  // Loading state functions
  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  const value = {
    // Notifications
    notifications: notificationState.notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,

    // Loading state
    isLoading,
    setLoading,

    // Breadcrumbs
    breadcrumbs,
    updateBreadcrumbs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
