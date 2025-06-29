import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  X,
  Calendar,
  User,
  Package,
  Star,
  RefreshCw,
  Loader2,
  Check,
  MessageCircle,
  Send,
} from "lucide-react";
import { useProductStore, useNotificationStore, useAuthStore } from "../stores";

const ProductManagement = () => {
  // Zustand stores
  const {
    products,
    filters,
    pagination,
    isLoading,
    isRefreshing,
    actionLoading,
    selectedProducts,
    setFilters,
    setPagination,
    setSelectedProducts,
    toggleProductSelection,
    selectAllProducts,
    clearSelection,
    fetchProducts,
    refreshProducts,
    updateProductStatus,
    bulkUpdateStatus,
    deleteProduct,
    submitNegotiation,
  } = useProductStore();

  const { showSuccess, showError, showWarning, showInfo } =
    useNotificationStore();
  const { user } = useAuthStore();

  // Local component state
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [negotiationForm, setNegotiationForm] = useState({
    proposedPrice: "",
    reason: "",
    message: "",
  });

  // Load products on component mount and when filters change
  useEffect(() => {
    fetchProducts(true).catch((error) => {
      showError("Failed to load products");
      console.error("Error loading products:", error);
    });
  }, [filters.search, filters.status]);

  // Handle page changes
  useEffect(() => {
    if (pagination.page > 1) {
      fetchProducts().catch((error) => {
        showError("Failed to load products");
        console.error("Error loading products:", error);
      });
    }
  }, [pagination.page]);

  // Handle search
  const handleSearch = (value) => {
    setFilters({ search: value });
    setPagination({ page: 1 });
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    setFilters({ status });
    setPagination({ page: 1 });
  };

  // Handle product status update
  const handleStatusUpdate = async (productId, status) => {
    try {
      const response = await updateProductStatus(productId, status);
      if (response.success) {
        showSuccess(`Product ${status} successfully`);
      }
    } catch (error) {
      showError(`Failed to update product status: ${error.message}`);
    }
  };

  // Handle bulk status update
  const handleBulkStatusUpdate = async (status) => {
    if (selectedProducts.length === 0) {
      showWarning("Please select products to update");
      return;
    }

    try {
      const response = await bulkUpdateStatus(selectedProducts, status);
      if (response.success) {
        showSuccess(
          `${selectedProducts.length} products ${status} successfully`
        );
      }
    } catch (error) {
      showError(`Failed to update products: ${error.message}`);
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await deleteProduct(productId);
      if (response.success) {
        showSuccess("Product deleted successfully");
      }
    } catch (error) {
      showError(`Failed to delete product: ${error.message}`);
    }
  };

  // Handle negotiation modal
  const handleNegotiation = (product) => {
    setSelectedProduct(product);
    setNegotiationForm({
      proposedPrice: product.price.toString(),
      reason: "",
      message: "",
    });
    setShowNegotiationModal(true);
  };

  // Submit negotiation
  const handleNegotiationSubmit = async () => {
    if (!selectedProduct) return;

    const negotiationData = {
      ...negotiationForm,
      proposedPrice: parseFloat(negotiationForm.proposedPrice),
      adminName: user?.name || "Admin User",
    };

    try {
      const response = await submitNegotiation(
        selectedProduct.id,
        negotiationData
      );
      if (response.success) {
        showSuccess("Price negotiation sent successfully");
        setShowNegotiationModal(false);
        setNegotiationForm({ proposedPrice: "", reason: "", message: "" });
      }
    } catch (error) {
      showError(`Failed to submit negotiation: ${error.message}`);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setPagination({ page });
  };

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      clearSelection();
    } else {
      selectAllProducts();
    }
  };

  const handleProductSelect = (productId) => {
    toggleProductSelection(productId);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} flex items-center gap-1`}
      >
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600">Manage and approve product listings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refreshProducts}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {pagination.total}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.status === "pending").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.status === "approved").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter((p) => p.status === "rejected").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedProducts.length} product(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkStatusUpdate("approved")}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Approve All
              </button>
              <button
                onClick={() => handleBulkStatusUpdate("rejected")}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Reject All
              </button>
              <button
                onClick={clearSelection}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === products.length &&
                        products.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleProductSelect(product.id)}
                        className="rounded border-gray-300 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={product.images?.[0] || "/placeholder-image.jpg"}
                          alt={product.title}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.category} • {product.condition}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {product.seller}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.sellerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.price)}
                      </div>
                      {product.originalPrice !== product.price && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatCurrency(product.originalPrice)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(product.submittedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(product.id, "approved")
                              }
                              disabled={actionLoading[product.id]}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg disabled:opacity-50"
                              title="Approve"
                            >
                              {actionLoading[product.id] ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(product.id, "rejected")
                              }
                              disabled={actionLoading[product.id]}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg disabled:opacity-50"
                              title="Reject"
                            >
                              {actionLoading[product.id] ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleNegotiation(product)}
                          disabled={actionLoading[`negotiate_${product.id}`]}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg disabled:opacity-50"
                          title="Negotiate Price"
                        >
                          {actionLoading[`negotiate_${product.id}`] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <DollarSign className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={actionLoading[product.id]}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg disabled:opacity-50"
                          title="Delete"
                        >
                          {actionLoading[product.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {filters.search || filters.status !== "all"
                ? "Try adjusting your search or filters"
                : "No products have been submitted yet"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(pagination.page - 1) * pagination.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === pagination.page
                        ? "z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Negotiation Modal */}
      {showNegotiationModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Price Negotiation</h3>
              <button
                onClick={() => setShowNegotiationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product
                </label>
                <p className="text-sm text-gray-900">{selectedProduct.title}</p>
                <p className="text-sm text-gray-500">
                  Current Price: {formatCurrency(selectedProduct.price)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Price
                </label>
                <input
                  type="number"
                  value={negotiationForm.proposedPrice}
                  onChange={(e) =>
                    setNegotiationForm({
                      ...negotiationForm,
                      proposedPrice: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter proposed price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <select
                  value={negotiationForm.reason}
                  onChange={(e) =>
                    setNegotiationForm({
                      ...negotiationForm,
                      reason: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select reason</option>
                  <option value="market_adjustment">
                    Market Price Adjustment
                  </option>
                  <option value="condition_based">
                    Condition Based Pricing
                  </option>
                  <option value="competitive_pricing">
                    Competitive Pricing
                  </option>
                  <option value="bulk_discount">Bulk Discount</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={negotiationForm.message}
                  onChange={(e) =>
                    setNegotiationForm({
                      ...negotiationForm,
                      message: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a message to the seller..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNegotiationModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleNegotiationSubmit}
                disabled={
                  !negotiationForm.proposedPrice || !negotiationForm.reason
                }
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {actionLoading[`negotiate_${selectedProduct.id}`] ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send Negotiation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
