"use client";

import Link from "next/link";
import { useState } from "react";
import { lookupOrder } from "./actions";

// ============================================
// COCAVYN - Track Order Page
// /track-order
// Stage 13.2 — With actual lookup
// ============================================

interface OrderData {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  subtotal: number;
  delivery_charge: number;
  discount: number;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  notes: string | null;
  created_at: string;
}

interface OrderItemData {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_emoji: string | null;
  subtotal: number;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  packed: "bg-indigo-100 text-indigo-800",
  shipped: "bg-cyan-100 text-cyan-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  card: "Card",
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [order, setOrder] = useState<OrderData | null>(null);
  const [items, setItems] = useState<OrderItemData[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setItems([]);
    setLoading(true);

    const result = await lookupOrder({ orderNumber, phone });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.success && result.order) {
      setOrder(result.order);
      setItems(result.items || []);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrder(null);
    setItems([]);
    setOrderNumber("");
    setPhone("");
    setError("");
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
        <div className="max-w-3xl mx-auto">
          {/* Form Card (hidden if order found) */}
          {!order && (
            <>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-cocoa/5 max-w-xl mx-auto">
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

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="mt-6 bg-cream-dark rounded-2xl p-6 border border-cocoa/5 max-w-xl mx-auto">
                <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-3">
                  How Order Tracking Works
                </h3>
                <ol className="space-y-2 text-sm text-cocoa-light">
                  <li className="flex gap-2">
                    <span className="font-bold text-cocoa-dark shrink-0">
                      1.
                    </span>
                    <span>Enter your order number and phone number</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-cocoa-dark shrink-0">
                      2.
                    </span>
                    <span>
                      View your order status and delivery information
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-cocoa-dark shrink-0">
                      3.
                    </span>
                    <span>Track your order's progress timeline</span>
                  </li>
                </ol>
              </div>
            </>
          )}

          {order && (
            <div>
              <div className="bg-white rounded-2xl p-6 border border-cocoa/5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray uppercase tracking-wider mb-1">
                      Order Number
                    </p>
                    <h2 className="font-serif text-2xl font-bold text-cocoa-dark font-mono">
                      {order.order_number}
                    </h2>
                    <p className="text-cocoa-light text-sm mt-1">
                      Placed on{" "}
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                      STATUS_STYLES[order.order_status] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.order_status.replace(/_/g, " ")}
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="text-sm text-gold hover:text-gold-dark transition-colors"
                >
                  ← Track Another Order
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-cocoa/5 mb-6">
                <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                  Order Items
                </h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-3 border-b border-cocoa/5 last:border-0"
                    >
                      <div className="w-14 h-14 rounded-lg bg-cream flex items-center justify-center text-2xl shrink-0">
                        {item.image_emoji || "🍫"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-cocoa-dark">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-cocoa-light">
                          ৳{Number(item.price).toLocaleString()} ×{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="font-serif font-bold text-cocoa-dark">
                        ৳{Number(item.subtotal).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-cocoa/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-cocoa-light">Subtotal</span>
                    <span className="font-medium text-cocoa-dark">
                      ৳{Number(order.subtotal).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cocoa-light">Delivery Charge</span>
                    <span className="font-medium text-cocoa-dark">
                      ৳{Number(order.delivery_charge).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-cocoa/10">
                    <span className="font-serif text-base font-bold text-cocoa-dark">
                      Total
                    </span>
                    <span className="font-serif text-2xl font-bold text-cocoa-dark">
                      ৳{Number(order.total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
                  <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                    Delivery Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-gray uppercase tracking-wider mb-1">
                        Name
                      </p>
                      <p className="font-medium text-cocoa-dark">
                        {order.customer_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <p className="font-medium text-cocoa-dark">
                        {order.customer_phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-cocoa-light leading-relaxed">
                        {order.shipping_address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
                  <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-gray uppercase tracking-wider mb-1">
                        Method
                      </p>
                      <p className="font-medium text-cocoa-dark">
                        {PAYMENT_METHOD_LABELS[order.payment_method] ||
                          order.payment_method}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                          order.payment_status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray uppercase tracking-wider mb-1">
                        Amount
                      </p>
                      <p className="font-serif text-xl font-bold text-cocoa-dark">
                        ৳{Number(order.total).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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