import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  CreditCard,
  User,
  Package,
  Send,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useApp } from "../context";

const PaymentManagement = () => {
  const { showSuccess, showError, showWarning, showInfo } = useApp();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    method: "bank_transfer",
    notes: "",
  });

  const mockPayments = [
    {
      id: 1,
      productId: 1,
      productTitle: "iPhone 13 Pro Max - 256GB Space Gray",
      customerId: 101,
      customerName: "John Doe",
      customerEmail: "john.doe@email.com",
      customerPhone: "+91 9876543210",
      customerVerified: true,
      productVerified: true,
      amount: 85000,
      status: "pending", // pending, processing, completed, failed
      submittedAt: "2024-12-25T10:30:00Z",
      processedAt: null,
      paymentMethod: null,
      transactionId: null,
      notes: "Product verification completed",
      customerBankDetails: {
        accountNumber: "****1234",
        ifscCode: "HDFC0001234",
        accountName: "John Doe",
      },
    },
    {
      id: 2,
      productId: 2,
      productTitle: "MacBook Air M2 - 512GB Silver",
      customerId: 102,
      customerName: "Jane Smith",
      customerEmail: "jane.smith@email.com",
      customerPhone: "+91 8765432109",
      customerVerified: true,
      productVerified: true,
      amount: 115000,
      status: "completed",
      submittedAt: "2024-12-24T15:45:00Z",
      processedAt: "2024-12-25T10:15:00Z",
      paymentMethod: "bank_transfer",
      transactionId: "TXN123456789",
      notes: "Payment processed successfully",
      customerBankDetails: {
        accountNumber: "****5678",
        ifscCode: "ICICI0005678",
        accountName: "Jane Smith",
      },
    },
    {
      id: 3,
      productId: 3,
      productTitle: "Sony WH-1000XM4 Headphones",
      customerId: 103,
      customerName: "Mike Johnson",
      customerEmail: "mike.johnson@email.com",
      customerPhone: "+91 7654321098",
      customerVerified: false,
      productVerified: true,
      amount: 18000,
      status: "pending",
      submittedAt: "2024-12-23T09:15:00Z",
      processedAt: null,
      paymentMethod: null,
      transactionId: null,
      notes: "Waiting for customer verification",
      customerBankDetails: {
        accountNumber: "****9012",
        ifscCode: "SBI0009012",
        accountName: "Mike Johnson",
      },
    },
    {
      id: 4,
      productId: 4,
      productTitle: "Vintage Leather Sofa",
      customerId: 104,
      customerName: "Sarah Wilson",
      customerEmail: "sarah.wilson@email.com",
      customerPhone: "+91 6543210987",
      customerVerified: true,
      productVerified: false,
      amount: 45000,
      status: "pending",
      submittedAt: "2024-12-22T14:20:00Z",
      processedAt: null,
      paymentMethod: null,
      transactionId: null,
      notes: "Product verification in progress",
      customerBankDetails: {
        accountNumber: "****3456",
        ifscCode: "AXIS0003456",
        accountName: "Sarah Wilson",
      },
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = payments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.productTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.customerEmail
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.transactionId
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, payments]);

  const handleProcessPayment = (paymentId) => {
    const payment = payments.find((p) => p.id === paymentId);

    if (!payment.customerVerified) {
      showError("Cannot process payment: Customer is not verified");
      return;
    }

    if (!payment.productVerified) {
      showError("Cannot process payment: Product is not verified");
      return;
    }

    setSelectedPayment(payment);
    setPaymentForm({
      amount: payment.amount.toString(),
      method: "bank_transfer",
      notes: "",
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!paymentForm.amount || !paymentForm.method) {
      showError("Please fill in all required fields");
      return;
    }

    const transactionId = `TXN${Date.now()}`;

    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === selectedPayment.id
          ? {
              ...payment,
              status: "processing",
              processedAt: new Date().toISOString(),
              paymentMethod: paymentForm.method,
              transactionId: transactionId,
              notes: paymentForm.notes || "Payment processed",
              amount: parseFloat(paymentForm.amount),
            }
          : payment
      )
    );

    // Simulate payment processing
    setTimeout(() => {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === selectedPayment.id
            ? { ...payment, status: "completed" }
            : payment
        )
      );

      showSuccess(
        `Payment of ₹${parseFloat(
          paymentForm.amount
        ).toLocaleString()} processed successfully to ${
          selectedPayment.customerName
        }`
      );
    }, 2000);

    setShowPaymentModal(false);
    setSelectedPayment(null);
    setPaymentForm({ amount: "", method: "bank_transfer", notes: "" });
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

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
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: DollarSign,
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      failed: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
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

  const getVerificationBadge = (isVerified, type) => {
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          isVerified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isVerified ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <XCircle className="w-3 h-3 mr-1" />
        )}
        {type} {isVerified ? "Verified" : "Unverified"}
      </span>
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600 mt-2">
          Process payments to verified customers for approved products
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search payments, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product & Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
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
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {payment.productTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {payment.customerName}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {payment.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(payment.amount)}
                    </div>
                    {payment.transactionId && (
                      <div className="text-xs text-gray-500">
                        ID: {payment.transactionId}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {getVerificationBadge(
                        payment.customerVerified,
                        "Customer"
                      )}
                      {getVerificationBadge(payment.productVerified, "Product")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.submittedAt)}
                    {payment.processedAt && (
                      <div className="text-xs text-gray-400">
                        Processed: {formatDate(payment.processedAt)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewPayment(payment)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                        title="View payment details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {payment.status === "pending" &&
                        payment.customerVerified === true &&
                        payment.productVerified === true && (
                          <button
                            onClick={() => handleProcessPayment(payment.id)}
                            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                            title="Process payment to customer"
                          >
                            <CreditCard className="h-3 w-3 mr-1" />
                            Process Payment
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No payments found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No payment requests found."}
            </p>
          </div>
        )}
      </div>

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Process Payment
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">
                Customer Details:
              </div>
              <div className="font-medium text-gray-900">
                {selectedPayment?.customerName}
              </div>
              <div className="text-sm text-gray-500">
                {selectedPayment?.customerEmail}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Account: {selectedPayment?.customerBankDetails.accountNumber}(
                {selectedPayment?.customerBankDetails.ifscCode})
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentForm.method}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, method: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="upi">UPI Transfer</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={paymentForm.notes}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Add any notes..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                Payment Details
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Information */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Payment Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Payment ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        #{selectedPayment.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Amount:
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(selectedPayment.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Status:
                      </span>
                      <div>{getStatusBadge(selectedPayment.status)}</div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Submitted:
                      </span>
                      <span className="text-sm text-gray-900">
                        {formatDate(selectedPayment.submittedAt)}
                      </span>
                    </div>
                    {selectedPayment.processedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          Processed:
                        </span>
                        <span className="text-sm text-gray-900">
                          {formatDate(selectedPayment.processedAt)}
                        </span>
                      </div>
                    )}
                    {selectedPayment.paymentMethod && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          Method:
                        </span>
                        <span className="text-sm text-gray-900 capitalize">
                          {selectedPayment.paymentMethod.replace("_", " ")}
                        </span>
                      </div>
                    )}
                    {selectedPayment.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          Transaction ID:
                        </span>
                        <span className="text-sm font-mono text-gray-900">
                          {selectedPayment.transactionId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Information */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Product Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Product:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPayment.productTitle}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Product ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        #{selectedPayment.productId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Verification:
                      </span>
                      <div>
                        {getVerificationBadge(
                          selectedPayment.productVerified,
                          "Product"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Customer Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Name:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPayment.customerName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Email:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPayment.customerEmail}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Phone:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPayment.customerPhone}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Customer ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        #{selectedPayment.customerId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Verification:
                      </span>
                      <div>
                        {getVerificationBadge(
                          selectedPayment.customerVerified,
                          "Customer"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Bank Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Account Name:
                      </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedPayment.customerBankDetails.accountName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Account Number:
                      </span>
                      <p className="text-sm font-mono text-gray-900 mt-1">
                        {selectedPayment.customerBankDetails.accountNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        IFSC Code:
                      </span>
                      <p className="text-sm font-mono text-gray-900 mt-1">
                        {selectedPayment.customerBankDetails.ifscCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {selectedPayment.notes && (
              <div className="mt-6 bg-yellow-50 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Notes
                </h4>
                <p className="text-sm text-gray-700">{selectedPayment.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Last updated:{" "}
                {formatDate(
                  selectedPayment.processedAt || selectedPayment.submittedAt
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedPayment.status === "pending" &&
                  selectedPayment.customerVerified === true &&
                  selectedPayment.productVerified === true && (
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleProcessPayment(selectedPayment.id);
                      }}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Process Payment
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
