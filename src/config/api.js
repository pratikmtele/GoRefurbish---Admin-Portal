// API Configuration for GoRefurbish Admin Panel
// This file contains all the API endpoint configurations and settings

// Environment Configuration
export const API_CONFIG = {
  // Base URL for the API - change this to your actual API URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // API Version
  VERSION: 'v1',
  
  // Environment
  ENVIRONMENT: import.meta.env.MODE || 'development',
  
  // Enable mock mode for development
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true' || true,
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    attempts: 3,
    delay: 1000,
  }
};

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  // Products
  PRODUCTS: {
    LIST: "/admin/products",
    DETAILS: "/admin/products/:id",
    UPDATE_STATUS: "/admin/products/:id/status",
    BULK_UPDATE: "/admin/products/bulk-update",
    DELETE: "/admin/products/:id",
    NEGOTIATE: "/admin/products/:id/negotiate",
    NEGOTIATIONS: "/admin/products/:id/negotiations",
  },

  // Users
  USERS: {
    LIST: "/admin/users",
    DETAILS: "/admin/users/:id",
    UPDATE: "/admin/users/:id",
    DELETE: "/admin/users/:id",
    BLOCK: "/admin/users/:id/block",
    UNBLOCK: "/admin/users/:id/unblock",
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: "/admin/analytics/dashboard",
    REVENUE: "/admin/analytics/revenue",
    USERS: "/admin/analytics/users",
    PRODUCTS: "/admin/analytics/products",
  },

  // Settings
  SETTINGS: {
    GET: "/admin/settings",
    UPDATE: "/admin/settings",
    TEST_EMAIL: "/admin/settings/test-email",
    TEST_PAYMENT: "/admin/settings/test-payment",
  },

  // Payments
  PAYMENTS: {
    LIST: "/admin/payments",
    DETAILS: "/admin/payments/:id",
    PROCESS: "/admin/payments/:id/process",
    APPROVE: "/admin/payments/:id/approve",
    REJECT: "/admin/payments/:id/reject",
    BULK_PROCESS: "/admin/payments/bulk-process",
  },

  // Staff Management
  STAFF: {
    LIST: "/admin/staff",
    CREATE: "/admin/staff",
    UPDATE: "/admin/staff/:id",
    DELETE: "/admin/staff/:id",
    PERMISSIONS: "/admin/staff/:id/permissions",
  },

  // File Upload
  UPLOAD: {
    IMAGE: "/upload/image",
    DOCUMENT: "/upload/document",
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Request Headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Authentication Token Storage
export const TOKEN_STORAGE = {
  ACCESS_TOKEN: "adminAccessToken",
  REFRESH_TOKEN: "adminRefreshToken",
  USER_DATA: "adminUserData",
};

// Mock API Delays (for development)
export const MOCK_DELAYS = {
  FAST: 300,
  NORMAL: 800,
  SLOW: 1500,
  VERY_SLOW: 3000,
};

// API Response Status
export const API_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
  IDLE: "idle",
};

// Product Status Options
export const PRODUCT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  DRAFT: "draft",
  ARCHIVED: "archived",
};

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  STAFF: "staff",
  MODERATOR: "moderator",
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  },
  DOCUMENT: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied. Please contact administrator.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  TIMEOUT_ERROR: "Request timeout. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PRODUCT_APPROVED: "Product approved successfully",
  PRODUCT_REJECTED: "Product rejected successfully",
  PRODUCT_DELETED: "Product deleted successfully",
  BULK_ACTION_COMPLETED: "Bulk action completed successfully",
  SETTINGS_SAVED: "Settings saved successfully",
  PAYMENT_PROCESSED: "Payment processed successfully",
  USER_UPDATED: "User updated successfully",
  NEGOTIATION_SENT: "Price negotiation sent successfully",
};

// Currency Configuration
export const CURRENCY = {
  SYMBOL: "₹",
  CODE: "INR",
  LOCALE: "en-IN",
};

// Date/Time Configuration
export const DATE_TIME = {
  LOCALE: "en-IN",
  TIMEZONE: "Asia/Kolkata",
  FORMATS: {
    DATE: "DD/MM/YYYY",
    TIME: "HH:mm",
    DATETIME: "DD/MM/YYYY HH:mm",
    FULL: "DD MMM YYYY, HH:mm",
  },
};

// Feature Flags
export const FEATURES = {
  ENABLE_NEGOTIATIONS: true,
  ENABLE_BULK_ACTIONS: true,
  ENABLE_ADVANCED_FILTERS: true,
  ENABLE_REAL_TIME_UPDATES: false,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_FILE_UPLOAD: true,
  ENABLE_DARK_MODE: false,
};

// Performance Configuration
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CONCURRENT_REQUESTS: 6,
  ENABLE_REQUEST_DEDUPLICATION: true,
};

// Security Configuration
export const SECURITY = {
  ENABLE_CSRF_PROTECTION: true,
  SESSION_TIMEOUT: 60 * 60 * 1000, // 1 hour
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
};

export default {
  API_CONFIG,
  ENDPOINTS,
  HTTP_STATUS,
  DEFAULT_HEADERS,
  TOKEN_STORAGE,
  MOCK_DELAYS,
  API_STATUS,
  PRODUCT_STATUS,
  USER_ROLES,
  PAYMENT_STATUS,
  NOTIFICATION_TYPES,
  PAGINATION,
  UPLOAD_LIMITS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  CURRENCY,
  DATE_TIME,
  FEATURES,
  PERFORMANCE,
  SECURITY,
};
