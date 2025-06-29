import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  Users,
  X,
  Save,
  Eye,
  EyeOff,
  UserPlus,
  Settings,
} from "lucide-react";
import { useApp } from "../context";

const StaffManagement = () => {
  const { showSuccess, showError } = useApp();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    permissions: [],
    password: "",
    confirmPassword: "",
  });

  const mockStaff = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@gorefurbish.com",
      phone: "+91 9876543210",
      role: "admin",
      status: "active",
      createdAt: "2024-11-01T10:00:00Z",
      lastActive: "2024-12-29T14:30:00Z",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face",
      permissions: [
        "products.view",
        "products.approve",
        "products.reject",
        "products.delete",
        "users.view",
        "users.manage",
        "staff.view",
        "staff.manage",
        "payments.view",
        "payments.process",
        "settings.manage",
      ],
      createdBy: "System",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@gorefurbish.com",
      phone: "+91 8765432109",
      role: "staff",
      status: "active",
      createdAt: "2024-11-10T09:30:00Z",
      lastActive: "2024-12-28T16:45:00Z",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      permissions: [
        "products.view",
        "products.approve",
        "products.reject",
        "users.view",
        "payments.view",
      ],
      createdBy: "Alice Johnson",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@gorefurbish.com",
      phone: "+91 7654321098",
      role: "moderator",
      status: "inactive",
      createdAt: "2024-11-20T11:15:00Z",
      lastActive: "2024-12-20T10:30:00Z",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      permissions: [
        "products.view",
        "products.approve",
        "products.reject",
        "users.view",
      ],
      createdBy: "Alice Johnson",
    },
  ];

  const availablePermissions = [
    {
      category: "Products",
      permissions: [
        {
          key: "products.view",
          label: "View Products",
          description: "Can view all products",
        },
        {
          key: "products.approve",
          label: "Approve Products",
          description: "Can approve pending products",
        },
        {
          key: "products.reject",
          label: "Reject Products",
          description: "Can reject products",
        },
        {
          key: "products.delete",
          label: "Delete Products",
          description: "Can permanently delete products",
        },
      ],
    },
    {
      category: "Users",
      permissions: [
        {
          key: "users.view",
          label: "View Users",
          description: "Can view user profiles and details",
        },
        {
          key: "users.manage",
          label: "Manage Users",
          description: "Can suspend/activate users",
        },
      ],
    },
    {
      category: "Staff",
      permissions: [
        {
          key: "staff.view",
          label: "View Staff",
          description: "Can view staff members",
        },
        {
          key: "staff.manage",
          label: "Manage Staff",
          description: "Can add/edit/remove staff members",
        },
      ],
    },
    {
      category: "Payments",
      permissions: [
        {
          key: "payments.view",
          label: "View Payments",
          description: "Can view payment requests and history",
        },
        {
          key: "payments.process",
          label: "Process Payments",
          description: "Can process payments to verified customers",
        },
      ],
    },
    {
      category: "Settings",
      permissions: [
        {
          key: "settings.manage",
          label: "Manage Settings",
          description: "Can modify platform settings",
        },
      ],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStaff(mockStaff);
      setFilteredStaff(mockStaff);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = staff;

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((member) => member.role === roleFilter);
    }

    setFilteredStaff(filtered);
  }, [searchTerm, roleFilter, staff]);

  const handleAddStaff = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "staff",
      permissions: [],
      password: "",
      confirmPassword: "",
    });
    setShowAddModal(true);
  };

  const handleEditStaff = (staffMember) => {
    setSelectedStaff(staffMember);
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      role: staffMember.role,
      permissions: staffMember.permissions,
      password: "",
      confirmPassword: "",
    });
    setShowEditModal(true);
  };

  const handleManagePermissions = (staffMember) => {
    setSelectedStaff(staffMember);
    setFormData({
      ...formData,
      permissions: staffMember.permissions,
    });
    setShowPermissionsModal(true);
  };

  const handleDeleteStaff = (staffId, staffName) => {
    if (
      window.confirm(`Are you sure you want to remove ${staffName} from staff?`)
    ) {
      setStaff((prev) => prev.filter((member) => member.id !== staffId));
      showSuccess(`${staffName} has been removed from staff`);
    }
  };

  const handleStatusToggle = (staffId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const staffMember = staff.find((member) => member.id === staffId);

    setStaff((prev) =>
      prev.map((member) =>
        member.id === staffId ? { ...member, status: newStatus } : member
      )
    );

    showSuccess(
      `${staffMember.name} has been ${
        newStatus === "active" ? "activated" : "deactivated"
      }`
    );
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      showError("Password must be at least 6 characters long");
      return;
    }

    const newStaff = {
      id: staff.length + 1,
      ...formData,
      status: "active",
      createdAt: new Date().toISOString(),
      lastActive: null,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        formData.name
      )}&background=3B82F6&color=fff`,
      createdBy: "Current Admin", // This would be the logged-in admin's name
    };

    setStaff((prev) => [...prev, newStaff]);
    setShowAddModal(false);
    showSuccess(`${formData.name} has been added as ${formData.role}`);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      showError("Password must be at least 6 characters long");
      return;
    }

    setStaff((prev) =>
      prev.map((member) =>
        member.id === selectedStaff.id ? { ...member, ...formData } : member
      )
    );

    setShowEditModal(false);
    showSuccess(`${formData.name}'s details have been updated`);
  };

  const handleSubmitPermissions = (e) => {
    e.preventDefault();

    setStaff((prev) =>
      prev.map((member) =>
        member.id === selectedStaff.id
          ? { ...member, permissions: formData.permissions }
          : member
      )
    );

    setShowPermissionsModal(false);
    showSuccess(`${selectedStaff.name}'s permissions have been updated`);
  };

  const handlePermissionToggle = (permissionKey) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionKey)
        ? prev.permissions.filter((p) => p !== permissionKey)
        : [...prev.permissions, permissionKey],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: ShieldCheck,
      },
      staff: { bg: "bg-blue-100", text: "text-blue-800", icon: Shield },
      moderator: { bg: "bg-green-100", text: "text-green-800", icon: Users },
    };

    const config = roleConfig[role] || roleConfig.staff;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-100", text: "text-green-800" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800" },
    };

    const config = statusConfig[status];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-2">
            Manage admin staff members and their permissions
          </p>
        </div>

        <button
          onClick={handleAddStaff}
          className="mt-4 lg:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Staff Member
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(member.role)}</td>
                  <td className="px-6 py-4">{getStatusBadge(member.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{formatDate(member.createdAt)}</div>
                    <div className="text-xs text-gray-400">
                      by {member.createdBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(member.lastActive)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {member.permissions.length} permissions
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 justify-end">
                      <button
                        onClick={() => handleManagePermissions(member)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                        title="Manage Permissions"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditStaff(member)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit Staff"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusToggle(member.id, member.status)
                        }
                        className={`p-2 rounded-lg ${
                          member.status === "active"
                            ? "text-yellow-600 hover:bg-yellow-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={
                          member.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        {member.status === "active" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteStaff(member.id, member.name)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Remove Staff"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No staff members found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || roleFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by adding your first staff member."}
            </p>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <StaffModal
          title="Add Staff Member"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitAdd}
          onClose={() => setShowAddModal(false)}
          availablePermissions={availablePermissions}
          handlePermissionToggle={handlePermissionToggle}
          isEditing={false}
        />
      )}

      {/* Edit Staff Modal */}
      {showEditModal && (
        <StaffModal
          title="Edit Staff Member"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmitEdit}
          onClose={() => setShowEditModal(false)}
          availablePermissions={availablePermissions}
          handlePermissionToggle={handlePermissionToggle}
          isEditing={true}
        />
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && selectedStaff && (
        <PermissionsModal
          staff={selectedStaff}
          formData={formData}
          onSubmit={handleSubmitPermissions}
          onClose={() => setShowPermissionsModal(false)}
          availablePermissions={availablePermissions}
          handlePermissionToggle={handlePermissionToggle}
        />
      )}
    </div>
  );
};

// Staff Modal Component
const StaffModal = ({
  title,
  formData,
  setFormData,
  onSubmit,
  onClose,
  availablePermissions,
  handlePermissionToggle,
  isEditing,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="staff">Staff</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isEditing
                  ? "New Password (leave blank to keep current)"
                  : "Password *"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required={!isEditing}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isEditing ? "Confirm New Password" : "Confirm Password *"}
              </label>
              <input
                type="password"
                required={!isEditing || formData.password}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Permissions
            </label>
            <div className="space-y-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {availablePermissions.map((category) => (
                <div key={category.category}>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {category.category}
                  </h4>
                  <div className="space-y-2 ml-4">
                    {category.permissions.map((permission) => (
                      <label
                        key={permission.key}
                        className="flex items-start space-x-3"
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(
                            permission.key
                          )}
                          onChange={() =>
                            handlePermissionToggle(permission.key)
                          }
                          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {permission.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {permission.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "Update Staff" : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Permissions Modal Component
const PermissionsModal = ({
  staff,
  formData,
  onSubmit,
  onClose,
  availablePermissions,
  handlePermissionToggle,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Manage Permissions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {staff.name} - {staff.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-6">
            {availablePermissions.map((category) => (
              <div
                key={category.category}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.permissions.map((permission) => (
                    <label
                      key={permission.key}
                      className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.key)}
                        onChange={() => handlePermissionToggle(permission.key)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {permission.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {permission.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {formData.permissions.length} permission(s) selected
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Permissions
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffManagement;
