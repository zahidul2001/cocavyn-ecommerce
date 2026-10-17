"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitPayment } from "@/app/order-confirmation/[orderNumber]/actions";

// ============================================
// ORRIVA - Payment Instructions Component
// Stage 14.1 — For bKash/Nagad manual payment
// ============================================

interface PaymentInstructionsProps {
  orderId: string;
  orderNumber: string;
  orderTotal: number;
  paymentMethod: "bkash" | "nagad";
  currentStatus: string;
  existingTransactionId?: string | null;
  existingPaymentNumber?: string | null;
}

// Business payment numbers (will be from Settings in Stage 17)
const BUSINESS_BKASH_NUMBER = "01852134062";
const BUSINESS_NAGAD_NUMBER = "01852134062";

export default function PaymentInstructions({
  orderId,
  orderNumber,
  orderTotal,
  paymentMethod,
  currentStatus,
  existingTransactionId,
  existingPaymentNumber,
}: PaymentInstructionsProps) {
  const router = useRouter();

  const [transactionId, setTransactionId] = useState(
    existingTransactionId || ""
  );
  const [paymentNumber, setPaymentNumber] = useState(
    existingPaymentNumber || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const businessNumber =
    paymentMethod === "bkash" ? BUSINESS_BKASH_NUMBER : BUSINESS_NAGAD_NUMBER;

  const methodLabel = paymentMethod === "bkash" ? "bKash" : "Nagad";
  const methodColor =
    paymentMethod === "bkash" ? "bg-pink-50 border-pink-200" : "bg-orange-50 border-orange-200";
  const methodTextColor =
    paymentMethod === "bkash" ? "text-pink-700" : "text-orange-700";

  // Already submitted or paid
  const isSubmitted =
    currentStatus === "pending_verification" || currentStatus === "paid";
  const isPaid = currentStatus === "paid";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await submitPayment({
      orderId,
      transactionId,
      paymentNumber,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  };

  // If already paid — show success
  if (isPaid) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckIcon className="text-green-600" />
          </div>
          <div>
            <p className="font-bold text-green-800">Payment Verified</p>
            <p className="text-sm text-green-600">
              Your payment has been confirmed by our team.
            </p>
          </div>
        </div>
        {existingTransactionId && (
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray uppercase tracking-wider mb-1">
              Transaction ID
            </p>
            <p className="font-mono text-sm text-cocoa-dark">
              {existingTransactionId}
            </p>
          </div>
        )}
      </div>
    );
  }

  // If already submitted but pending verification
  if (isSubmitted && !success) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <ClockIcon className="text-yellow-600" />
          </div>
          <div>
            <p className="font-bold text-yellow-800">
              Payment Under Verification
            </p>
            <p className="text-sm text-yellow-600">
              We are verifying your payment. It will be updated soon.
            </p>
          </div>
        </div>
        {existingTransactionId && (
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray uppercase tracking-wider mb-1">
              Transaction ID
            </p>
            <p className="font-mono text-sm text-cocoa-dark">
              {existingTransactionId}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 border ${methodColor}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center`}
          >
            <WalletIcon className={methodTextColor} />
          </div>
          <div>
            <h3 className={`font-serif text-xl font-bold ${methodTextColor}`}>
              Complete Your Payment
            </h3>
            <p className="text-sm text-cocoa-light">
              Send money via {methodLabel} to confirm your order
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-xl p-5 mb-6">
        <p className="text-xs text-gray uppercase tracking-wider mb-2">
          Payment Instructions
        </p>

        <ol className="space-y-2 text-sm text-cocoa-light">
          <li className="flex gap-2">
            <span className="font-bold text-cocoa-dark shrink-0">1.</span>
            <span>
              Open your {methodLabel} app and select <strong>Send Money</strong>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-cocoa-dark shrink-0">2.</span>
            <span>
              Send <strong>৳{orderTotal.toLocaleString()}</strong> to{" "}
              <strong className="font-mono">{businessNumber}</strong>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-cocoa-dark shrink-0">3.</span>
            <span>Copy the Transaction ID from your {methodLabel} confirmation</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-cocoa-dark shrink-0">4.</span>
            <span>Enter the Transaction ID below</span>
          </li>
        </ol>

        <div className="mt-4 p-3 bg-cream rounded-lg flex items-center justify-between">
          <div>
            <p className="text-xs text-gray uppercase tracking-wider">
              {methodLabel} Number
            </p>
            <p className="font-mono font-bold text-cocoa-dark">
              {businessNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray uppercase tracking-wider">
              Amount
            </p>
            <p className="font-serif font-bold text-cocoa-dark text-lg">
              ৳{orderTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-2">
              Transaction ID *
            </label>
            <input
              type="text"
              required
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., 8N7A6D5F"
              className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-white focus:outline-none focus:border-gold transition-colors text-cocoa-dark placeholder:text-gray font-mono"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cocoa-dark mb-2">
              Your {methodLabel} Number *
            </label>
            <input
              type="tel"
              required
              value={paymentNumber}
              onChange={(e) => setPaymentNumber(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-white focus:outline-none focus:border-gold transition-colors text-cocoa-dark placeholder:text-gray font-mono"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
              paymentMethod === "bkash"
                ? "bg-pink-600 hover:bg-pink-700"
                : "bg-orange-600 hover:bg-orange-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <SpinnerIcon />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <CheckIcon />
                <span>Submit Payment</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray text-center">
            After submission, we'll verify your payment within 1-2 hours.
          </p>
        </div>
      </form>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function WalletIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}