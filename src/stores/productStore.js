import { create } from "zustand";
import productService from "../services/productService";

const useProductStore = create((set, get) => ({
  // Product data
  products: [],
  selectedProduct: null,

  // Filters and search
  filters: {
    search: "",
    status: "all",
    category: "all",
  },

  // Pagination
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  // Loading states
  isLoading: false,
  isRefreshing: false,
  actionLoading: {},

  // Selection
  selectedProducts: [],

  // Actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setRefreshing: (refreshing) => {
    set({ isRefreshing: refreshing });
  },

  setActionLoading: (productId, loading) => {
    set((state) => ({
      actionLoading: {
        ...state.actionLoading,
        [productId]: loading,
      },
    }));
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  setPagination: (pagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));
  },

  setSelectedProducts: (productIds) => {
    set({ selectedProducts: productIds });
  },

  toggleProductSelection: (productId) => {
    set((state) => {
      const isSelected = state.selectedProducts.includes(productId);
      return {
        selectedProducts: isSelected
          ? state.selectedProducts.filter((id) => id !== productId)
          : [...state.selectedProducts, productId],
      };
    });
  },

  selectAllProducts: () => {
    const products = get().products;
    set({ selectedProducts: products.map((p) => p.id) });
  },

  clearSelection: () => {
    set({ selectedProducts: [] });
  },

  // API Actions
  fetchProducts: async (resetPagination = false) => {
    const { filters, pagination } = get();

    set({ isLoading: true });

    try {
      const queryFilters = {
        ...filters,
        page: resetPagination ? 1 : pagination.page,
        limit: pagination.limit,
      };

      const response = await productService.getProducts(queryFilters);

      if (response.success) {
        set({
          products: response.data,
          pagination: {
            ...pagination,
            ...response.pagination,
            page: resetPagination ? 1 : pagination.page,
          },
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  refreshProducts: async () => {
    set({ isRefreshing: true });
    try {
      await get().fetchProducts();
    } finally {
      set({ isRefreshing: false });
    }
  },

  updateProductStatus: async (productId, status, reason = "") => {
    set((state) => ({
      actionLoading: { ...state.actionLoading, [productId]: true },
    }));

    try {
      const response = await productService.updateProductStatus(
        productId,
        status,
        reason
      );

      if (response.success) {
        // Update product in the list
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? { ...product, status, updatedAt: response.data.updatedAt }
              : product
          ),
          actionLoading: { ...state.actionLoading, [productId]: false },
        }));

        return response;
      }
    } catch (error) {
      set((state) => ({
        actionLoading: { ...state.actionLoading, [productId]: false },
      }));
      throw error;
    }
  },

  bulkUpdateStatus: async (productIds, status, reason = "") => {
    // Set loading for all selected products
    const loadingState = {};
    productIds.forEach((id) => {
      loadingState[id] = true;
    });

    set((state) => ({
      actionLoading: { ...state.actionLoading, ...loadingState },
    }));

    try {
      const response = await productService.bulkUpdateProductStatus(
        productIds,
        status,
        reason
      );

      if (response.success) {
        // Update all products in the list
        set((state) => ({
          products: state.products.map((product) =>
            productIds.includes(product.id)
              ? { ...product, status, updatedAt: response.data.updatedAt }
              : product
          ),
          selectedProducts: [], // Clear selection after bulk action
          actionLoading: Object.keys(state.actionLoading).reduce((acc, key) => {
            if (!productIds.includes(parseInt(key))) {
              acc[key] = state.actionLoading[key];
            }
            return acc;
          }, {}),
        }));

        return response;
      }
    } catch (error) {
      // Clear loading states on error
      set((state) => ({
        actionLoading: Object.keys(state.actionLoading).reduce((acc, key) => {
          if (!productIds.includes(parseInt(key))) {
            acc[key] = state.actionLoading[key];
          }
          return acc;
        }, {}),
      }));
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    set((state) => ({
      actionLoading: { ...state.actionLoading, [productId]: true },
    }));

    try {
      const response = await productService.deleteProduct(productId);

      if (response.success) {
        // Remove product from the list
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId
          ),
          selectedProducts: state.selectedProducts.filter(
            (id) => id !== productId
          ),
          actionLoading: { ...state.actionLoading, [productId]: false },
        }));

        return response;
      }
    } catch (error) {
      set((state) => ({
        actionLoading: { ...state.actionLoading, [productId]: false },
      }));
      throw error;
    }
  },

  submitNegotiation: async (productId, negotiationData) => {
    set((state) => ({
      actionLoading: {
        ...state.actionLoading,
        [`negotiate_${productId}`]: true,
      },
    }));

    try {
      const response = await productService.submitNegotiation(
        productId,
        negotiationData
      );

      if (response.success) {
        // Update the product with new negotiation
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  negotiations: [
                    ...(product.negotiations || []),
                    response.data,
                  ],
                }
              : product
          ),
          actionLoading: {
            ...state.actionLoading,
            [`negotiate_${productId}`]: false,
          },
        }));

        return response;
      }
    } catch (error) {
      set((state) => ({
        actionLoading: {
          ...state.actionLoading,
          [`negotiate_${productId}`]: false,
        },
      }));
      throw error;
    }
  },

  // Reset store
  reset: () => {
    set({
      products: [],
      selectedProduct: null,
      filters: {
        search: "",
        status: "all",
        category: "all",
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
      isLoading: false,
      isRefreshing: false,
      actionLoading: {},
      selectedProducts: [],
    });
  },
}));

export default useProductStore;
