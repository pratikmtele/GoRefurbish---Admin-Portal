import { useState } from "react";
import {
  Save,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  Mail,
  Key,
  Users,
  CreditCard,
} from "lucide-react";
import { useNotificationStore } from "../stores";

const Settings = () => {
  const { showSuccess, showError, showWarning, showInfo } =
    useNotificationStore();
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "GoRefurbish",
    siteDescription: "Premium Refurbished Electronics Marketplace",
    contactEmail: "admin@gorefurbish.com",
    supportEmail: "support@gorefurbish.com",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    orderNotifications: true,
    productApprovalNotifications: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordComplexity: true,

    // Platform Settings
    maintenanceMode: false,
    allowRegistration: true,
    autoApproveProducts: false,
    commissionRate: 5,

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",

    // Payment Automation Settings
    enablePaymentAutomation: true,
    autoPaymentThreshold: 10000,
    paymentDelayHours: 24,
    requireDualApproval: true,

    // Payment Gateway Settings
    razorpayKeyId: "",
    razorpayKeySecret: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
    paytmMerchantId: "",
    paytmMerchantKey: "",

    // Bank Account Details for Settlements
    bankAccountName: "",
    bankAccountNumber: "",
    bankIfscCode: "",
    bankName: "",
    bankBranch: "",

    // UPI Details
    upiId: "",
    upiQrCode: "",
  });

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (section) => {
    // Simulate API call
    setTimeout(() => {
      showSuccess(`${section} settings saved successfully`);
    }, 500);
  };

  const handleTest = (feature) => {
    switch (feature) {
      case "email":
        showInfo("Test email sent successfully");
        break;
      case "notification":
        showInfo("Test notification sent");
        break;
      case "payment":
        showInfo("Payment gateway connection test successful");
        break;
      default:
        showInfo(`${feature} test completed`);
    }
  };

  const SettingCard = ({ title, icon: Icon, children, onSave, onTest }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex space-x-2">
          {onTest && (
            <button
              onClick={onTest}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Test
            </button>
          )}
          <button
            onClick={onSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Platform configuration and admin settings
        </p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <SettingCard
          title="General Settings"
          icon={Globe}
          onSave={() => handleSave("General")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  handleInputChange("general", "siteName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  handleInputChange("general", "contactEmail", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange(
                    "general",
                    "siteDescription",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </SettingCard>

        {/* Notification Settings */}
        <SettingCard
          title="Notification Settings"
          icon={Bell}
          onSave={() => handleSave("Notification")}
          onTest={() => handleTest("notification")}
        >
          <div className="space-y-4">
            {[
              { key: "emailNotifications", label: "Email Notifications" },
              { key: "pushNotifications", label: "Push Notifications" },
              { key: "orderNotifications", label: "Order Notifications" },
              {
                key: "productApprovalNotifications",
                label: "Product Approval Notifications",
              },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[key]}
                    onChange={(e) =>
                      handleInputChange("notification", key, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </SettingCard>

        {/* Security Settings */}
        <SettingCard
          title="Security Settings"
          icon={Shield}
          onSave={() => handleSave("Security")}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Two-Factor Authentication
                </span>
                <p className="text-xs text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) =>
                    handleInputChange(
                      "security",
                      "twoFactorAuth",
                      e.target.checked
                    )
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleInputChange(
                    "security",
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </SettingCard>

        {/* Platform Settings */}
        <SettingCard
          title="Platform Settings"
          icon={Database}
          onSave={() => handleSave("Platform")}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Maintenance Mode
                </span>
                <p className="text-xs text-gray-500">
                  Temporarily disable public access
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => {
                    handleInputChange(
                      "platform",
                      "maintenanceMode",
                      e.target.checked
                    );
                    if (e.target.checked) {
                      showWarning(
                        "Maintenance mode enabled - public access disabled"
                      );
                    } else {
                      showInfo(
                        "Maintenance mode disabled - public access restored"
                      );
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.commissionRate}
                  onChange={(e) =>
                    handleInputChange(
                      "platform",
                      "commissionRate",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Auto-approve Products
                  </span>
                  <p className="text-xs text-gray-500">Skip manual approval</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoApproveProducts}
                    onChange={(e) =>
                      handleInputChange(
                        "platform",
                        "autoApproveProducts",
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Payment Automation Settings */}
        <SettingCard
          title="Payment Automation"
          icon={CreditCard}
          onSave={() => handleSave("Payment Automation")}
          onTest={() => handleTest("payment")}
        >
          <div className="space-y-6">
            {/* Automation Rules */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Automation Rules
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Enable Payment Automation
                    </span>
                    <p className="text-sm text-gray-500">
                      Automatically process payments for verified transactions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enablePaymentAutomation}
                      onChange={(e) =>
                        handleInputChange(
                          "payment",
                          "enablePaymentAutomation",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Require Dual Approval
                    </span>
                    <p className="text-sm text-gray-500">
                      Require two admin approvals for payments above threshold
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireDualApproval}
                      onChange={(e) =>
                        handleInputChange(
                          "payment",
                          "requireDualApproval",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Payment Threshold (₹)
                    </label>
                    <input
                      type="number"
                      value={settings.autoPaymentThreshold}
                      onChange={(e) =>
                        handleInputChange(
                          "payment",
                          "autoPaymentThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Payments below this amount will be processed automatically
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Delay (Hours)
                    </label>
                    <input
                      type="number"
                      value={settings.paymentDelayHours}
                      onChange={(e) =>
                        handleInputChange(
                          "payment",
                          "paymentDelayHours",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="24"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Delay before processing automatic payments
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Gateway Configuration */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Payment Gateway Configuration
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razorpay Key ID
                  </label>
                  <input
                    type="text"
                    value={settings.razorpayKeyId}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "razorpayKeyId",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="rzp_test_xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razorpay Key Secret
                  </label>
                  <input
                    type="password"
                    value={settings.razorpayKeySecret}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "razorpayKeySecret",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stripe Publishable Key
                  </label>
                  <input
                    type="text"
                    value={settings.stripePublishableKey}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "stripePublishableKey",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="pk_test_xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stripe Secret Key
                  </label>
                  <input
                    type="password"
                    value={settings.stripeSecretKey}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "stripeSecretKey",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Details */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Settlement Bank Account
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={settings.bankAccountName}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "bankAccountName",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="GoRefurbish Private Limited"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={settings.bankAccountNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "bankAccountNumber",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234567890123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={settings.bankIfscCode}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "bankIfscCode",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="HDFC0001234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={settings.bankName}
                    onChange={(e) =>
                      handleInputChange("payment", "bankName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="HDFC Bank"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Address
                  </label>
                  <input
                    type="text"
                    value={settings.bankBranch}
                    onChange={(e) =>
                      handleInputChange("payment", "bankBranch", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MG Road, Bangalore - 560001"
                  />
                </div>
              </div>
            </div>

            {/* UPI Details */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4">
                UPI Configuration
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={settings.upiId}
                    onChange={(e) =>
                      handleInputChange("payment", "upiId", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="gorefurbish@paytm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI QR Code URL
                  </label>
                  <input
                    type="url"
                    value={settings.upiQrCode}
                    onChange={(e) =>
                      handleInputChange("payment", "upiQrCode", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/qr-code.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Email Settings */}
        <SettingCard
          title="Email Configuration"
          icon={Mail}
          onSave={() => handleSave("Email")}
          onTest={() => handleTest("email")}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) =>
                  handleInputChange("email", "smtpHost", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Port
              </label>
              <input
                type="number"
                value={settings.smtpPort}
                onChange={(e) =>
                  handleInputChange(
                    "email",
                    "smtpPort",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Username
              </label>
              <input
                type="text"
                value={settings.smtpUsername}
                onChange={(e) =>
                  handleInputChange("email", "smtpUsername", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP Password
              </label>
              <input
                type="password"
                value={settings.smtpPassword}
                onChange={(e) =>
                  handleInputChange("email", "smtpPassword", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </SettingCard>
      </div>
    </div>
  );
};

export default Settings;
