import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Users,
  DollarSign,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../context";

const Dashboard = () => {
  const { showSuccess, showError, showWarning, showInfo } = useApp();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    approvedToday: 0,
    activeUsers: 0,
    pendingPayments: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalProducts: 1247,
        totalUsers: 3892,
        totalRevenue: 2847500,
        pendingApprovals: 23,
        approvedToday: 15,
        activeUsers: 142,
        pendingPayments: 8,
      });

      setRecentActivity([
        {
          id: 1,
          type: "product_submitted",
          title: "New Product Submitted",
          description: "iPhone 13 Pro Max by John Doe",
          time: "2 minutes ago",
          status: "pending",
        },
        {
          id: 2,
          type: "product_approved",
          title: "Product Approved",
          description: "MacBook Air M2 by Jane Smith",
          time: "15 minutes ago",
          status: "approved",
        },
        {
          id: 3,
          type: "user_registered",
          title: "New User Registered",
          description: "Mike Johnson joined the platform",
          time: "1 hour ago",
          status: "info",
        },
        {
          id: 4,
          type: "product_sold",
          title: "Product Sold",
          description: "Sony Headphones sold for ₹18,000",
          time: "2 hours ago",
          status: "success",
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    change,
    changeType,
    description,
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div
              className={`flex items-center mt-2 text-sm ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{change}</span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = () => {
      switch (activity.type) {
        case "product_submitted":
          return <Clock className="h-4 w-4 text-yellow-500" />;
        case "product_approved":
          return <CheckCircle className="h-4 w-4 text-green-500" />;
        case "user_registered":
          return <Users className="h-4 w-4 text-blue-500" />;
        case "product_sold":
          return <DollarSign className="h-4 w-4 text-green-500" />;
        default:
          return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
          <p className="text-sm text-gray-500">{activity.description}</p>
          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      {" "}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the GoRefurbish Admin Portal
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          icon={Package}
          change="+12%"
          changeType="positive"
          description="From last month"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          change="+8%"
          changeType="positive"
          description="Active users"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          change="+15%"
          changeType="positive"
          description="This month"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={Clock}
          description="Requires attention"
        />
      </div>
      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Approved Today"
          value={stats.approvedToday}
          icon={CheckCircle}
          description="Products approved"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={Eye}
          description="Currently online"
        />
        <StatCard
          title="Conversion Rate"
          value="12.5%"
          icon={TrendingUp}
          change="+2.1%"
          changeType="positive"
          description="Sales conversion"
        />
      </div>
      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="p-3 space-y-1 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="px-6 py-3 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all activity →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/products"
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">
                  Review Pending Products
                </span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {stats.pendingApprovals}
              </span>
            </Link>

            <Link
              to="/users"
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-gray-900">Manage Users</span>
              </div>
            </Link>

            <Link
              to="/payments"
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">
                  Process Payments
                </span>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {stats.pendingPayments}
              </span>
            </Link>

            <Link
              to="/settings"
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-gray-900">
                  Payment Automation Settings
                </span>
              </div>
            </Link>

            <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-600 mr-3" />
                <span className="font-medium text-gray-900">
                  System Reports
                </span>
              </div>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
