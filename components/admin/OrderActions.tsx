"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus, verifyPayment } from "@/app/admin/actions/orders";

// ============================================
// COCAVYN - Order Actions
// Status update + Payment verification
// Stage 12.3
// ============================================

interface OrderActionsProps {
  orderId: string;
  currentStatus: string;
  paymentMethod: string;
  paymentStatus: string;
}

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "packed", label: "Packed" },
  { value: "shipped", label: "Shipped" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function OrderActions({
  orderId,
  currentStatus,
  paymentMethod,
  paymentStatus,
}: OrderActionsProps) {
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const isPaymentVerified = paymentStatus === "paid";
  const isCancelled = currentStatus === "cancelled";

  // ============================================
  // Handle Status Update
  // ============================================

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) {
      setStatusMessage({
        type: "error",
        text: "Please select a different status",
      });
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    setStatusLoading(true);
    setStatusMessage(null);

    const result = await updateOrderStatus(orderId, selectedStatus);

    if (result.error) {
      setStatusMessage({ type: "error", text: result.error });
      setStatusLoading(false);
      setTimeout(() => setStatusMessage(null), 5000);
      return;
    }

    setStatusMessage({
      type: "success",
      text: `Status updated to "${selectedStatus.replace(/_/g, " ")}"`,
    });
    setStatusLoading(false);
    router.refresh();

    setTimeout(() => setStatusMessage(null), 5000);
  };

  // ============================================
  // Handle Payment Verification
  // ============================================

  const handleVerifyPayment = async () => {
    setPaymentError("");

    if (!transactionId.trim()) {
      setPaymentError("Transaction ID is required");
      return;
    }

    setPaymentLoading(true);

    const result = await verifyPayment(orderId, transactionId, paymentNumber);

    if (result.error) {
      setPaymentError(result.error);
      setPaymentLoading(false);
      return;
    }

    setShowPaymentModal(false);
    setPaymentLoading(false);
    setTransactionId("");
    setPaymentNumber("");
    router.refresh();
  };

  return (
    <>
      {/* Status Update Card */}
      <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
        <h2 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
          Update Status
        </h2>

        {isCancelled ? (
          <div className="text-sm text-red-600 p-3 bg-red-50 rounded-lg">
            ❌ This order is cancelled. Status cannot be changed.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cocoa-dark mb-2">
                  New Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  disabled={statusLoading}
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark"
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleStatusUpdate}
                disabled={statusLoading || selectedStatus === currentStatus}
                className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                  statusLoading || selectedStatus === currentStatus
                    ? "bg-gray-light text-gray cursor-not-allowed"
                    : "bg-cocoa text-cream hover:bg-cocoa-dark"
                }`}
              >
                {statusLoading ? "Updating..." : "Update Status"}
              </button>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`text-sm px-3 py-2 rounded-lg ${
                    statusMessage.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Payment Verification Card */}
      <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
        <h2 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
          Payment
        </h2>

        {isPaymentVerified ? (
          <div className="text-sm text-green-700 p-3 bg-green-50 rounded-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Payment verified
          </div>
        ) : paymentMethod === "cod" ? (
          <div className="text-sm text-cocoa-light p-3 bg-cream rounded-lg">
            💵 Cash on Delivery — Payment will be collected upon delivery.
            <button
              onClick={() => setShowPaymentModal(true)}
              className="block mt-3 w-full py-2 rounded-lg bg-cocoa text-cream hover:bg-cocoa-dark transition-colors text-xs font-medium"
            >
              Mark as Paid
            </button>
          </div>
        ) : (
          <>
            <div className="text-sm text-cocoa-light p-3 bg-cream rounded-lg mb-3">
              💳 {paymentMethod.toUpperCase()} — Manual verification needed.
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="w-full py-2.5 rounded-lg bg-cocoa text-cream hover:bg-cocoa-dark transition-colors text-sm font-medium"
            >
              Verify Payment
            </button>
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 bg-cocoa-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !paymentLoading && setShowPaymentModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-2">
              Verify Payment
            </h3>
            <p className="text-sm text-cocoa-light mb-5">
              Enter transaction details to verify this payment.
            </p>

            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                {paymentError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-cocoa-dark mb-2">
                  Transaction ID *
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g., 8N7A6D5F"
                  disabled={paymentLoading}
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cocoa-dark mb-2">
                  Payment Number (optional)
                </label>
                <input
                  type="text"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                  placeholder="e.g., 01852134062"
                  disabled={paymentLoading}
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray font-mono"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentError("");
                  setTransactionId("");
                  setPaymentNumber("");
                }}
                disabled={paymentLoading}
                className="px-4 py-2 rounded-lg bg-cream text-cocoa-dark hover:bg-cream-dark transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyPayment}
                disabled={paymentLoading}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  paymentLoading
                    ? "bg-gray-light text-gray cursor-not-allowed"
                    : "bg-cocoa text-cream hover:bg-cocoa-dark"
                }`}
              >
                {paymentLoading ? "Verifying..." : "Verify Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}