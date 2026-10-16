"use client";

import Link from "next/link";
import { useState } from "react";

// ============================================
// COCAVYN - Track Order Page
// /track-order
// Stage 13.1 — Form UI (English)
// ============================================

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TODO: Stage 13.2 — Actual order lookup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setError(
      "Order lookup will be available in Stage 13.2 — Coming soon!"
    );
    setLoading(false);
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-10 md:py-16">
          <nav className="text-sm text-gray mb-4">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cocoa-dark">Track Order</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-2">
            Track Your Order
          </h1>
          <p className="text-cocoa-light text-lg max-w-xl">
            Enter your order number and phone number to check your order
            status.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-cocoa/5">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-2">
                Order Tracking
              </h2>
              <p className="text-cocoa-light text-sm">
                We'll show your current order status
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Order Number */}
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Order Number *
                </label>
                <input
                  id="orderNumber"
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., CHO-2026-000001"
                  className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray font-mono"
                  disabled={loading}
                />
                <p className="text-xs text-gray mt-1">
                  You'll find this in your order confirmation message
                </p>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                  disabled={loading}
                />
                <p className="text-xs text-gray mt-1">
                  The phone number you used when placing the order
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-light text-gray cursor-not-allowed"
                    : "bg-cocoa text-cream hover:bg-cocoa-dark"
                }`}
              >
                {loading ? (
                  <>
                    <SpinnerIcon />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <SearchIcon />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </form>

            {/* Help */}
            <div className="mt-6 pt-6 border-t border-cocoa/10">
              <p className="text-xs text-gray text-center">
                Can't find your order number?{" "}
                <a
                  href="tel:01852134062"
                  className="text-gold hover:text-gold-dark"
                >
                  Contact us
                </a>
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-cream-dark rounded-2xl p-6 border border-cocoa/5">
            <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-3">
              How Order Tracking Works
            </h3>
            <ol className="space-y-2 text-sm text-cocoa-light">
              <li className="flex gap-2">
                <span className="font-bold text-cocoa-dark shrink-0">1.</span>
                <span>Enter your order number and phone number</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-cocoa-dark shrink-0">2.</span>
                <span>
                  View your order status and delivery information
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-cocoa-dark shrink-0">3.</span>
                <span>Track your order's progress timeline</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function SearchIcon() {
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
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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