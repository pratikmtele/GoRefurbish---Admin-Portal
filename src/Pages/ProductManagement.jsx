import React, { useState, useEffect } from "react";
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
import { useApp } from "../context";
import productService from "../services/productService";

// Mock data - remove when implementing real API
const mockProducts = [
  {
    id: 1,
    title: "iPhone 13 Pro Max - 256GB Space Gray",
    seller: "John Doe",
    sellerEmail: "john.doe@email.com",
    price: 85000,
    originalPrice: 90000,
    category: "Electronics",
    condition: "Excellent",
    status: "pending",
    submittedAt: "2024-12-25T10:30:00Z",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    ],
    description: "Excellent condition iPhone 13 Pro Max with 256GB storage...",
    negotiations: [
      {
        id: 1,
        type: "admin_offer",
        proposedPrice: 85000,
        reason: "market_adjustment",
        message:
          "Based on current market trends, we suggest this price adjustment",
        adminName: "Alice Johnson",
        createdAt: "2024-12-26T09:00:00Z",
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    title: "MacBook Air M2 - 512GB Silver",
    seller: "Jane Smith",
    sellerEmail: "jane.smith@email.com",
    price: 115000,
    originalPrice: 115000,
    category: "Electronics",
    condition: "Like New",
    status: "approved",
    submittedAt: "2024-12-24T15:45:00Z",
    images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"],
    description: "Like new MacBook Air with M2 chip...",
    negotiations: [],
  },
  {
    id: 3,
    title: "Sony WH-1000XM4 Headphones",
    seller: "Mike Johnson",
    sellerEmail: "mike.johnson@email.com",
    price: 18000,
    originalPrice: 20000,
    category: "Electronics",
    condition: "Good",
    status: "rejected",
    submittedAt: "2024-12-23T09:15:00Z",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    ],
    description: "Premium wireless headphones...",
    negotiations: [
      {
        id: 2,
        type: "admin_offer",
        proposedPrice: 18000,
        reason: "condition_adjustment",
        message: "Price adjusted based on product condition assessment",
        adminName: "Bob Smith",
        createdAt: "2024-12-23T10:00:00Z",
        status: "accepted",
      },
    ],
  },
  {
    id: 4,
    title: "Vintage Leather Sofa",
    seller: "Sarah Wilson",
    sellerEmail: "sarah.wilson@email.com",
    price: 45000,
    originalPrice: 45000,
    category: "Furniture",
    condition: "Used",
    status: "pending",
    submittedAt: "2024-12-22T14:20:00Z",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"],
    description: "Beautiful vintage leather sofa...",
    negotiations: [],
  },
];

const ProductManagement = () => {
  const { showSuccess, showError, showWarning, showInfo } = useApp();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [negotiationForm, setNegotiationForm] = useState({
    proposedPrice: "",
    reason: "",
    message: "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Load products from API
  const loadProducts = async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const filters = {
        search: searchTerm,
        status: statusFilter,
        page: pagination.page,
        limit: pagination.limit,
      };

      const response = await productService.getProducts(filters);

      if (response.success) {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setPagination(response.pagination);
      } else {
        throw new Error(response.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error loading products:", error);
      showError(error.message || "Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle product status change
  const handleStatusChange = async (productId, newStatus) => {
    try {
      setActionLoading((prev) => ({ ...prev, [productId]: "status" }));

      const product = products.find((p) => p.id === productId);
      const response = await productService.updateProductStatus(
        productId,
        newStatus
      );

      if (response.success) {
        // Update local state
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId
              ? { ...product, status: newStatus }
              : product
          )
        );

        // Show appropriate notification based on status change
        switch (newStatus) {
          case "approved":
            showSuccess(
              `Product "${product?.title}" has been approved successfully`
            );
            break;
          case "rejected":
            showWarning(`Product "${product?.title}" has been rejected`);
            break;
          case "pending":
            showInfo(`Product "${product?.title}" status changed to pending`);
            break;
          default:
            showInfo(`Product "${product?.title}" status updated`);
        }
      } else {
        throw new Error(response.message || "Failed to update product status");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      showError(
        error.message || "Failed to update product status. Please try again."
      );
    } finally {
      setActionLoading((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) {
      showWarning("Please select products to perform bulk action");
      return;
    }

    try {
      setActionLoading((prev) => ({ ...prev, bulk: action }));

      const response = await productService.bulkUpdateProductStatus(
        selectedProducts,
        action
      );

      if (response.success) {
        // Update local state
        setProducts((prev) =>
          prev.map((product) =>
            selectedProducts.includes(product.id)
              ? { ...product, status: action }
              : product
          )
        );

        const actionText =
          action === "approved"
            ? "approved"
            : action === "rejected"
            ? "rejected"
            : "updated";
        showSuccess(
          `${selectedProducts.length} product(s) ${actionText} successfully`
        );
        setSelectedProducts([]);
      } else {
        throw new Error(response.message || "Failed to perform bulk action");
      }
    } catch (error) {
      console.error("Error performing bulk action:", error);
      showError(
        error.message || "Failed to perform bulk action. Please try again."
      );
    } finally {
      setActionLoading((prev) => {
        const updated = { ...prev };
        delete updated.bulk;
        return updated;
      });
    }
  };

  // Handle negotiation
  const handleNegotiation = async (product) => {
    try {
      // Optionally fetch latest product details
      const response = await productService.getProductDetails(product.id);
      if (response.success && response.data) {
        setSelectedProduct(response.data);
        setNegotiationForm({
          proposedPrice: response.data.price.toString(),
          reason: "market_adjustment",
          message: "",
        });
        setShowNegotiationModal(true);
      } else {
        throw new Error("Failed to load product details");
      }
    } catch (error) {
      console.error("Error loading product for negotiation:", error);
      showError("Failed to load product details. Please try again.");
    }
  };

  // Handle negotiation submission
  const handleNegotiationSubmit = async (e) => {
    e.preventDefault();

    if (!negotiationForm.proposedPrice || !negotiationForm.message) {
      showError("Please fill in all required fields");
      return;
    }

    const proposedPrice = parseFloat(negotiationForm.proposedPrice);
    if (isNaN(proposedPrice) || proposedPrice <= 0) {
      showError("Please enter a valid price");
      return;
    }

    try {
      setActionLoading((prev) => ({ ...prev, negotiation: true }));

      const negotiationData = {
        proposedPrice,
        reason: negotiationForm.reason,
        message: negotiationForm.message,
        adminName: "Current Admin", // This should come from auth context
      };

      const response = await productService.submitNegotiation(
        selectedProduct.id,
        negotiationData
      );

      if (response.success) {
        // Update local state
        setProducts((prev) =>
          prev.map((product) =>
            product.id === selectedProduct.id
              ? {
                  ...product,
                  negotiations: [...product.negotiations, response.data],
                  price: proposedPrice,
                }
              : product
          )
        );

        const priceDifference = proposedPrice - selectedProduct.price;
        const changeType = priceDifference > 0 ? "increase" : "decrease";
        const changeAmount = Math.abs(priceDifference);

        showSuccess(
          `Price negotiation sent to ${
            selectedProduct.seller
          }. Proposed ${changeType} of ₹${changeAmount.toLocaleString()}`
        );

        setShowNegotiationModal(false);
        setSelectedProduct(null);
        setNegotiationForm({ proposedPrice: "", reason: "", message: "" });
      } else {
        throw new Error(response.message || "Failed to submit negotiation");
      }
    } catch (error) {
      console.error("Error submitting negotiation:", error);
      showError(
        error.message || "Failed to submit negotiation. Please try again."
      );
    } finally {
      setActionLoading((prev) => {
        const updated = { ...prev };
        delete updated.negotiation;
        return updated;
      });
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId, productTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${productTitle}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setActionLoading((prev) => ({ ...prev, [productId]: "delete" }));

      const response = await productService.deleteProduct(productId);

      if (response.success) {
        // Remove from local state
        setProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        showSuccess(`Product "${productTitle}" has been deleted successfully`);
      } else {
        throw new Error(response.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showError(error.message || "Failed to delete product. Please try again.");
    } finally {
      setActionLoading((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    loadProducts(true);
  };

  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products locally (can be moved to API for better performance)
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, statusFilter, products]);

  // Reload data when filters change (debounced)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!isLoading) {
        loadProducts();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, statusFilter]);

  // Remove mock data once everything is working
  const mockProducts = [
    // ... mock data will be removed when API is ready
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      approved: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    };

    const config = statusConfig[status];
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

  const ProductRow = ({ product }) => {
    const [showActions, setShowActions] = useState(false);
    const isProductLoading = actionLoading[product.id];

    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            checked={selectedProducts.includes(product.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedProducts((prev) => [...prev, product.id]);
              } else {
                setSelectedProducts((prev) =>
                  prev.filter((id) => id !== product.id)
                );
              }
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isProductLoading}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-12 w-12 rounded-lg object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
              }}
            />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                {product.title}
              </div>
              <div className="text-sm text-gray-500">
                {product.category} • {product.condition}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{product.seller}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </div>
          {product.price !== product.originalPrice && (
            <div className="flex items-center text-xs text-gray-500">
              <span className="line-through mr-1">
                {formatPrice(product.originalPrice)}
              </span>
              {product.price < product.originalPrice ? (
                <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
              ) : (
                <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
              )}
            </div>
          )}
          {product.negotiations.length > 0 && (
            <div className="text-xs text-blue-600 flex items-center mt-1">
              <MessageCircle className="h-3 w-3 mr-1" />
              {product.negotiations.length} negotiation(s)
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {getStatusBadge(product.status)}
          {isProductLoading === "status" && (
            <div className="text-xs text-blue-600 mt-1">Updating...</div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(product.submittedAt)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              disabled={isProductLoading}
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showActions && !isProductLoading && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => {
                      setShowActions(false);
                      // Add view details functionality
                      showInfo(`Viewing details for ${product.title}`);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      handleNegotiation(product);
                      setShowActions(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 w-full"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Negotiate Price
                  </button>
                  {product.status === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(product.id, "approved");
                          setShowActions(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-gray-100 w-full"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(product.id, "rejected");
                          setShowActions(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full"
                    onClick={() => {
                      handleDeleteProduct(product.id, product.title);
                      setShowActions(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}

            {isProductLoading && (
              <div className="absolute right-0 mt-2 text-xs text-blue-600">
                {isProductLoading === "status" && "Updating status..."}
                {isProductLoading === "delete" && "Deleting..."}
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  if (isLoading) {
    return (
      <div className="px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="px-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review all products on the platform
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={() => handleBulkAction("approved")}
                disabled={actionLoading.bulk === "approved"}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading.bulk === "approved" ? "Approving..." : "Approve"}
              </button>
              <button
                onClick={() => handleBulkAction("rejected")}
                disabled={actionLoading.bulk === "rejected"}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading.bulk === "rejected" ? "Rejecting..." : "Reject"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(filteredProducts.map((p) => p.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No products have been submitted yet."}
            </p>
          </div>
        )}
      </div>

      {/* Price Negotiation Modal */}
      {showNegotiationModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                Price Negotiation
              </h3>
              <button
                onClick={() => setShowNegotiationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Product Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">
                    {selectedProduct.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Seller: {selectedProduct.seller}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-medium text-gray-900">
                      Current Price: {formatPrice(selectedProduct.price)}
                    </span>
                    {selectedProduct.price !==
                      selectedProduct.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        Original: {formatPrice(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Negotiation History */}
            {selectedProduct.negotiations.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">
                  Negotiation History
                </h4>
                <div className="space-y-3 max-h-32 overflow-y-auto">
                  {selectedProduct.negotiations.map((negotiation) => (
                    <div
                      key={negotiation.id}
                      className="p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {negotiation.adminName} proposed{" "}
                            {formatPrice(negotiation.proposedPrice)}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            Reason: {negotiation.reason.replace("_", " ")}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {negotiation.message}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(negotiation.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Negotiation Form */}
            <form onSubmit={handleNegotiationSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposed Price *
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter proposed price"
                    required
                    min="0"
                    step="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Adjustment
                  </label>
                  <select
                    value={negotiationForm.reason}
                    onChange={(e) =>
                      setNegotiationForm({
                        ...negotiationForm,
                        reason: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="market_adjustment">Market Adjustment</option>
                    <option value="condition_adjustment">
                      Condition Assessment
                    </option>
                    <option value="competitive_pricing">
                      Competitive Pricing
                    </option>
                    <option value="demand_based">Demand Based</option>
                    <option value="seasonal_adjustment">
                      Seasonal Adjustment
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message to Seller *
                </label>
                <textarea
                  value={negotiationForm.message}
                  onChange={(e) =>
                    setNegotiationForm({
                      ...negotiationForm,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Explain the reason for price adjustment to the seller..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNegotiationModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Negotiation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
