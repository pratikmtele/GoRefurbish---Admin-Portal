import { API_CONFIG, ENDPOINTS, MOCK_DELAYS } from "../config/api.js";

const API_BASE_URL = API_CONFIG.BASE_URL;
const USE_MOCK_API = API_CONFIG.USE_MOCK_API;

class ProductService {
  async getProducts(filters = {}) {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.getMockProductsWithFilters(filters);
      }

      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.append("search", filters.search);
      if (filters.status && filters.status !== "all")
        queryParams.append("status", filters.status);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.page) queryParams.append("page", filters.page);
      if (filters.limit) queryParams.append("limit", filters.limit);

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.LIST}?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  // Update product status
  async updateProductStatus(productId, status, reason = "") {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockUpdateProductStatus(productId, status, reason);
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.UPDATE_STATUS.replace(
          ":id",
          productId
        )}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
          body: JSON.stringify({ status, reason }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating product status:", error);
      throw error;
    }
  }

  // Bulk update product statuses
  async bulkUpdateProductStatus(productIds, status, reason = "") {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockBulkUpdateProductStatus(
          productIds,
          status,
          reason
        );
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.BULK_UPDATE}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
          body: JSON.stringify({
            productIds,
            status,
            reason,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error bulk updating product status:", error);
      throw error;
    }
  }

  // Submit price negotiation
  async submitNegotiation(productId, negotiationData) {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockSubmitNegotiation(productId, negotiationData);
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.NEGOTIATE.replace(
          ":id",
          productId
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
          body: JSON.stringify(negotiationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting negotiation:", error);
      throw error;
    }
  }

  // Get product details
  async getProductDetails(productId) {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockGetProductDetails(productId);
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.DETAILS.replace(
          ":id",
          productId
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }

  // Delete product
  async deleteProduct(productId) {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockDeleteProduct(productId);
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.DELETE.replace(":id", productId)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  // Get negotiation history for a product
  async getNegotiationHistory(productId) {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockGetNegotiationHistory(productId);
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.NEGOTIATIONS.replace(
          ":id",
          productId
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching negotiation history:", error);
      throw error;
    }
  }

  // Update product details
  async updateProduct(productId, updateData) {
    try {
      // Use mock API in development mode
      if (USE_MOCK_API) {
        return await this.mockUpdateProduct(productId, updateData);
      }

      const response = await fetch(
        `${API_BASE_URL}${ENDPOINTS.PRODUCTS.DETAILS.replace(
          ":id",
          productId
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  // Helper method to get auth token
  getAuthToken() {
    // This should get the token from localStorage, context, or your auth system
    return (
      localStorage.getItem("adminToken") ||
      localStorage.getItem("authToken") ||
      ""
    );
  }

  // Mock API Methods for Development
  async getMockProductsWithFilters(filters = {}) {
    await this.simulateApiCall(null, MOCK_DELAYS.NORMAL);

    let products = [...this.getMockProducts()];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      products = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.seller.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status && filters.status !== "all") {
      products = products.filter(
        (product) => product.status === filters.status
      );
    }

    if (filters.category && filters.category !== "all") {
      products = products.filter(
        (product) => product.category === filters.category
      );
    }

    return {
      success: true,
      data: products,
      pagination: {
        total: products.length,
        page: parseInt(filters.page) || 1,
        limit: parseInt(filters.limit) || 10,
        totalPages: Math.ceil(
          products.length / (parseInt(filters.limit) || 10)
        ),
      },
    };
  }

  async mockUpdateProductStatus(productId, status, reason = "") {
    await this.simulateApiCall(null, MOCK_DELAYS.FAST);

    return {
      success: true,
      message: `Product status updated to ${status}`,
      data: {
        productId,
        status,
        reason,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  async mockBulkUpdateProductStatus(productIds, status, reason = "") {
    await this.simulateApiCall(null, MOCK_DELAYS.NORMAL);

    return {
      success: true,
      message: `${productIds.length} products updated to ${status}`,
      data: {
        updatedProducts: productIds,
        status,
        reason,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  async mockSubmitNegotiation(productId, negotiationData) {
    await this.simulateApiCall(null, MOCK_DELAYS.FAST);

    const newNegotiation = {
      id: Date.now(),
      type: "admin_offer",
      proposedPrice: negotiationData.proposedPrice,
      reason: negotiationData.reason,
      message: negotiationData.message,
      adminName: negotiationData.adminName || "Admin User",
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    return {
      success: true,
      message: "Negotiation submitted successfully",
      data: newNegotiation,
    };
  }

  async mockGetProductDetails(productId) {
    await this.simulateApiCall(null, MOCK_DELAYS.FAST);

    const product = this.getMockProducts().find(
      (p) => p.id === parseInt(productId)
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      success: true,
      data: product,
    };
  }

  async mockDeleteProduct(productId) {
    await this.simulateApiCall(null, MOCK_DELAYS.FAST);

    return {
      success: true,
      message: "Product deleted successfully",
      data: { productId, deletedAt: new Date().toISOString() },
    };
  }

  async mockGetNegotiationHistory(productId) {
    await this.simulateApiCall(null, MOCK_DELAYS.FAST);

    const product = this.getMockProducts().find(
      (p) => p.id === parseInt(productId)
    );

    return {
      success: true,
      data: product?.negotiations || [],
    };
  }

  async mockUpdateProduct(productId, updateData) {
    await this.simulateApiCall(null, MOCK_DELAYS.FAST);

    return {
      success: true,
      message: "Product updated successfully",
      data: {
        productId,
        ...updateData,
        updatedAt: new Date().toISOString(),
      },
    };
  }

  // Mock data fallback for development
  getMockProducts() {
    return [
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
        description:
          "Excellent condition iPhone 13 Pro Max with 256GB storage...",
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
        images: [
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
        ],
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
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
        ],
        description: "Beautiful vintage leather sofa...",
        negotiations: [],
      },
    ];
  }

  // Development mode API simulation
  async simulateApiCall(data, delay = MOCK_DELAYS.NORMAL) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }
}

export default new ProductService();
