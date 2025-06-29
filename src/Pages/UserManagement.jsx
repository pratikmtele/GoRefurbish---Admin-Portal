import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Shield,
  ShieldOff,
  Edit,
  Trash2,
  Users,
  Mail,
  Calendar,
  Activity,
  X,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  User,
  Home,
} from "lucide-react";
import { useNotificationStore } from "../stores";

const UserManagement = () => {
  const { showSuccess, showError, showWarning, showInfo } =
    useNotificationStore();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 9876543210",
      role: "seller",
      status: "active",
      joinedAt: "2024-11-15T10:30:00Z",
      lastActive: "2024-12-25T08:45:00Z",
      totalProducts: 15,
      totalSales: 125000,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      // Personal Details
      personalDetails: {
        dateOfBirth: "1985-03-15",
        gender: "Male",
        address: {
          street: "123 MG Road",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001",
          country: "India",
        },
        emergencyContact: {
          name: "Jane Doe",
          relationship: "Spouse",
          phone: "+91 9876543211",
        },
      },
      // KYC Details
      kycDetails: {
        status: "verified",
        verifiedAt: "2024-11-20T14:30:00Z",
        documents: {
          aadhar: {
            number: "1234-5678-9012",
            verified: true,
            uploadedAt: "2024-11-16T10:00:00Z",
          },
          pan: {
            number: "ABCDE1234F",
            verified: true,
            uploadedAt: "2024-11-16T10:05:00Z",
          },
          bankAccount: {
            accountNumber: "1234567890",
            ifscCode: "HDFC0001234",
            bankName: "HDFC Bank",
            verified: true,
            uploadedAt: "2024-11-16T10:10:00Z",
          },
        },
        riskLevel: "low",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+91 8765432109",
      role: "buyer",
      status: "active",
      joinedAt: "2024-10-22T14:20:00Z",
      lastActive: "2024-12-24T16:30:00Z",
      totalProducts: 0,
      totalSales: 0,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face",
      personalDetails: {
        dateOfBirth: "1990-07-22",
        gender: "Female",
        address: {
          street: "456 Brigade Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          country: "India",
        },
        emergencyContact: {
          name: "Robert Smith",
          relationship: "Father",
          phone: "+91 8765432108",
        },
      },
      kycDetails: {
        status: "pending",
        verifiedAt: null,
        documents: {
          aadhar: {
            number: "2345-6789-0123",
            verified: false,
            uploadedAt: "2024-10-23T09:00:00Z",
          },
          pan: {
            number: "BCDEF2345G",
            verified: false,
            uploadedAt: "2024-10-23T09:05:00Z",
          },
          bankAccount: {
            accountNumber: "2345678901",
            ifscCode: "ICICI0002345",
            bankName: "ICICI Bank",
            verified: false,
            uploadedAt: "2024-10-23T09:10:00Z",
          },
        },
        riskLevel: "medium",
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+91 7654321098",
      role: "seller",
      status: "suspended",
      joinedAt: "2024-09-10T11:15:00Z",
      lastActive: "2024-12-20T12:00:00Z",
      totalProducts: 8,
      totalSales: 45000,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      personalDetails: {
        dateOfBirth: "1988-12-10",
        gender: "Male",
        address: {
          street: "789 Commercial Street",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
          country: "India",
        },
        emergencyContact: {
          name: "Sarah Johnson",
          relationship: "Sister",
          phone: "+91 7654321097",
        },
      },
      kycDetails: {
        status: "rejected",
        verifiedAt: null,
        documents: {
          aadhar: {
            number: "3456-7890-1234",
            verified: false,
            uploadedAt: "2024-09-11T10:00:00Z",
            rejectionReason: "Document quality unclear",
          },
          pan: {
            number: "CDEFG3456H",
            verified: false,
            uploadedAt: "2024-09-11T10:05:00Z",
            rejectionReason: "Name mismatch",
          },
          bankAccount: {
            accountNumber: "3456789012",
            ifscCode: "SBI0003456",
            bankName: "State Bank of India",
            verified: false,
            uploadedAt: "2024-09-11T10:10:00Z",
          },
        },
        riskLevel: "high",
      },
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const handleStatusChange = (userId, newStatus) => {
    const user = users.find((u) => u.id === userId);
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );

    switch (newStatus) {
      case "active":
        showSuccess(`User "${user?.name}" has been activated`);
        break;
      case "suspended":
        showWarning(`User "${user?.name}" has been suspended`);
        break;
      case "banned":
        showError(`User "${user?.name}" has been banned`);
        break;
      default:
        showInfo(`User "${user?.name}" status updated`);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) {
      showWarning("Please select users to perform bulk action");
      return;
    }

    const actionText =
      action === "active"
        ? "activated"
        : action === "suspended"
        ? "suspended"
        : "updated";

    setUsers((prev) =>
      prev.map((user) =>
        selectedUsers.includes(user.id) ? { ...user, status: action } : user
      )
    );

    showSuccess(`${selectedUsers.length} user(s) ${actionText} successfully`);
    setSelectedUsers([]);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    showInfo(`Viewing details for ${user.name}`);
  };

  const handleCloseModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: Activity,
        label: "Active",
      },
      suspended: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: ShieldOff,
        label: "Suspended",
      },
      banned: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: Shield,
        label: "Banned",
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="px-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-2">
          Manage platform users and their permissions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction("active")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction("suspended")}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction("banned")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Ban
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {
                        setSelectedUsers((prev) =>
                          prev.includes(user.id)
                            ? prev.filter((id) => id !== user.id)
                            : [...prev, user.id]
                        );
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(user.joinedAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>
                      <div>Products: {user.totalProducts}</div>
                      <div>Sales: {formatCurrency(user.totalSales)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            user.id,
                            user.status === "active" ? "suspended" : "active"
                          )
                        }
                        className={`p-2 rounded-lg ${
                          user.status === "active"
                            ? "text-yellow-600 hover:bg-yellow-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={
                          user.status === "active"
                            ? "Suspend User"
                            : "Activate User"
                        }
                      >
                        {user.status === "active" ? (
                          <ShieldOff className="w-4 h-4" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          showInfo("User edit functionality coming soon")
                        }
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

// User Details Modal Component
const UserDetailsModal = ({ user, onClose }) => {
  const getKycStatusBadge = (status) => {
    const statusConfig = {
      verified: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: AlertCircle,
      },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: X },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRiskLevelBadge = (level) => {
    const levelConfig = {
      low: { bg: "bg-green-100", text: "text-green-800" },
      medium: { bg: "bg-yellow-100", text: "text-yellow-800" },
      high: { bg: "bg-red-100", text: "text-red-800" },
    };

    const config = levelConfig[level] || levelConfig.medium;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {level.charAt(0).toUpperCase() + level.slice(1)} Risk
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <span className="text-sm text-gray-900">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Email:
                  </span>
                  <span className="text-sm text-gray-900">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Phone:
                  </span>
                  <span className="text-sm text-gray-900">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Role:
                  </span>
                  <span className="text-sm text-gray-900 capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Status:
                  </span>
                  <span className="text-sm text-gray-900 capitalize">
                    {user.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Joined:
                  </span>
                  <span className="text-sm text-gray-900">
                    {formatDate(user.joinedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Last Active:
                  </span>
                  <span className="text-sm text-gray-900">
                    {formatDate(user.lastActive)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Platform Activity
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Total Products:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user.totalProducts}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Total Sales:
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                    }).format(user.totalSales)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Date of Birth:
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date(
                      user.personalDetails.dateOfBirth
                    ).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Gender:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user.personalDetails.gender}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Address:
                  </span>
                  <div className="text-sm text-gray-900 mt-1">
                    {user.personalDetails.address.street}
                    <br />
                    {user.personalDetails.address.city},{" "}
                    {user.personalDetails.address.state}
                    <br />
                    {user.personalDetails.address.pincode},{" "}
                    {user.personalDetails.address.country}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Emergency Contact:
                  </span>
                  <div className="text-sm text-gray-900 mt-1">
                    <div>{user.personalDetails.emergencyContact.name}</div>
                    <div>
                      {user.personalDetails.emergencyContact.relationship}
                    </div>
                    <div>{user.personalDetails.emergencyContact.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KYC Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              KYC Details
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  KYC Status:
                </span>
                <div className="mt-1">
                  {getKycStatusBadge(user.kycDetails.status)}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Risk Level:
                </span>
                <div className="mt-1">
                  {getRiskLevelBadge(user.kycDetails.riskLevel)}
                </div>
              </div>
              {user.kycDetails.verifiedAt && (
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Verified At:
                  </span>
                  <div className="text-sm text-gray-900">
                    {formatDate(user.kycDetails.verifiedAt)}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Aadhar Details */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Aadhar Card
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Number:</span>
                    <span className="text-gray-900 ml-2">
                      {user.kycDetails.documents.aadhar.number}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`ml-2 ${
                        user.kycDetails.documents.aadhar.verified
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.kycDetails.documents.aadhar.verified
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Uploaded:</span>
                    <span className="text-gray-900 ml-2">
                      {formatDate(user.kycDetails.documents.aadhar.uploadedAt)}
                    </span>
                  </div>
                  {user.kycDetails.documents.aadhar.rejectionReason && (
                    <div>
                      <span className="text-gray-600">Rejection Reason:</span>
                      <span className="text-red-600 ml-2">
                        {user.kycDetails.documents.aadhar.rejectionReason}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* PAN Details */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  PAN Card
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Number:</span>
                    <span className="text-gray-900 ml-2">
                      {user.kycDetails.documents.pan.number}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`ml-2 ${
                        user.kycDetails.documents.pan.verified
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.kycDetails.documents.pan.verified
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Uploaded:</span>
                    <span className="text-gray-900 ml-2">
                      {formatDate(user.kycDetails.documents.pan.uploadedAt)}
                    </span>
                  </div>
                  {user.kycDetails.documents.pan.rejectionReason && (
                    <div>
                      <span className="text-gray-600">Rejection Reason:</span>
                      <span className="text-red-600 ml-2">
                        {user.kycDetails.documents.pan.rejectionReason}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Bank Account
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Account:</span>
                    <span className="text-gray-900 ml-2">
                      {user.kycDetails.documents.bankAccount.accountNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">IFSC:</span>
                    <span className="text-gray-900 ml-2">
                      {user.kycDetails.documents.bankAccount.ifscCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Bank:</span>
                    <span className="text-gray-900 ml-2">
                      {user.kycDetails.documents.bankAccount.bankName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`ml-2 ${
                        user.kycDetails.documents.bankAccount.verified
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.kycDetails.documents.bankAccount.verified
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Uploaded:</span>
                    <span className="text-gray-900 ml-2">
                      {formatDate(
                        user.kycDetails.documents.bankAccount.uploadedAt
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
