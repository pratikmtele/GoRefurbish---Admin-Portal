import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Shield,
  CreditCard,
} from "lucide-react";
import { useAuthStore, useAppStore, useNotificationStore } from "../stores";
import NotificationSystem from "./NotificationSystem";

const Layout = ({ children }) => {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { showSuccess } = useNotificationStore();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Users", href: "/users", icon: Users },
    { name: "Staff", href: "/staff", icon: Shield },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    showSuccess("Logged out successfully");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <span className="ml-3 text-white font-semibold text-lg">
              GoRefurbish
            </span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-6 mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Main Navigation
            </p>
          </div>

          <div className="space-y-1 px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? "bg-blue-50 border-r-4 border-blue-600 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200`}
                >
                  <Icon
                    className={`${
                      isActive(item.href)
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">
                  {user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="hidden md:block ml-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search products, users..."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user?.name?.charAt(0) || "A"}
                  </span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {user?.name || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-6">{children}</div>
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Notification System */}
      <NotificationSystem />
    </div>
  );
};

export default Layout;
