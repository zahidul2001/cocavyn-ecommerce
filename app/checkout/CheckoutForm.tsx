"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "./actions";

// ============================================
// COCAVYN - Checkout Form (Client Component)
// Stage 11.5 — With Place Order functionality
// ============================================

interface DeliveryZone {
  id: string;
  name: string;
  charge: number;
  estimated_days: string | null;
}

interface CheckoutFormProps {
  deliveryZones: DeliveryZone[];
}

export default function CheckoutForm({ deliveryZones }: CheckoutFormProps) {
  const router = useRouter();
  const { items, subtotal, clearCart, isLoaded } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    division: "",
    district: "",
    upazila: "",
    area: "",
    fullAddress: "",
    landmark: "",
    deliveryNote: "",
  });

  const [selectedZoneId, setSelectedZoneId] = useState<string>(
    deliveryZones[0]?.id || ""
  );
  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "bkash" | "nagad"
  >("cod");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedZone = deliveryZones.find((z) => z.id === selectedZoneId);
  const deliveryCharge = selectedZone?.charge || 0;
  const total = subtotal + deliveryCharge;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await createOrder({
        formData,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          price: item.price,
          quantity: item.quantity,
          imageEmoji: item.imageEmoji,
        })),
        deliveryZoneId: selectedZoneId,
        deliveryCharge,
        paymentMethod,
        subtotal,
        total,
      });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.success && result.orderNumber) {
        // Clear cart
        clearCart();

        // Redirect to confirmation page
        router.push(`/order-confirmation/${result.orderNumber}`);
      }
    } catch (err: any) {
      console.error("Order error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="bg-cream min-h-screen py-16">
        <div className="container-custom text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-cocoa-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-16">
        <div className="container-custom text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-serif text-4xl font-bold text-cocoa-dark mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-cocoa-light mb-8">
            Add some chocolate before checkout.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Start Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-8 md:py-12">
          <nav className="text-sm text-gray mb-4">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-gold">
              Cart
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cocoa-dark">Checkout</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-2">
            Checkout
          </h1>
          <p className="text-cocoa-light">
            Complete your information to place your order
          </p>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cocoa text-cream flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="font-serif text-xl font-bold text-cocoa-dark">
                  Customer Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Email (optional)
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cocoa text-cream flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="font-serif text-xl font-bold text-cocoa-dark">
                  Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Division *
                  </label>
                  <input
                    name="division"
                    type="text"
                    required
                    value={formData.division}
                    onChange={handleChange}
                    placeholder="e.g., Sylhet"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    District *
                  </label>
                  <input
                    name="district"
                    type="text"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g., Sylhet"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Upazila / Thana *
                  </label>
                  <input
                    name="upazila"
                    type="text"
                    required
                    value={formData.upazila}
                    onChange={handleChange}
                    placeholder="e.g., Sylhet Sadar"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Area *
                  </label>
                  <input
                    name="area"
                    type="text"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g., Zindabazar"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Full Address *
                  </label>
                  <textarea
                    name="fullAddress"
                    required
                    rows={3}
                    value={formData.fullAddress}
                    onChange={handleChange}
                    placeholder="House, Road, Block, etc."
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray resize-none"
                    disabled={loading}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Landmark (optional)
                  </label>
                  <input
                    name="landmark"
                    type="text"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Nearby landmark"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                    disabled={loading}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cocoa-dark mb-2">
                    Delivery Note (optional)
                  </label>
                  <textarea
                    name="deliveryNote"
                    rows={2}
                    value={formData.deliveryNote}
                    onChange={handleChange}
                    placeholder="Any special instruction for delivery"
                    className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray resize-none"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Delivery Zone */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cocoa text-cream flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="font-serif text-xl font-bold text-cocoa-dark">
                  Delivery Zone
                </h2>
              </div>

              {deliveryZones.length === 0 ? (
                <div className="text-sm text-red-600 p-3 bg-red-50 rounded-lg">
                  No delivery zones configured. Please contact support.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {deliveryZones.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      disabled={loading}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedZoneId === zone.id
                          ? "border-gold bg-gold/5"
                          : "border-cocoa/10 hover:border-cocoa/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-cocoa-dark">
                          {zone.name}
                        </span>
                        <span className="font-serif font-bold text-cocoa-dark">
                          ৳{zone.charge}
                        </span>
                      </div>
                      {zone.estimated_days && (
                        <p className="text-xs text-cocoa-light">
                          Estimated: {zone.estimated_days}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cocoa text-cream flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h2 className="font-serif text-xl font-bold text-cocoa-dark">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                    paymentMethod === "cod"
                      ? "border-gold bg-gold/5"
                      : "border-cocoa/10 hover:border-cocoa/30"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "cod"
                        ? "border-gold"
                        : "border-cocoa/30"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-cocoa-dark">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-cocoa-light">
                      Pay when you receive
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                    paymentMethod === "bkash"
                      ? "border-gold bg-gold/5"
                      : "border-cocoa/10 hover:border-cocoa/30"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "bkash"
                        ? "border-gold"
                        : "border-cocoa/30"
                    }`}
                  >
                    {paymentMethod === "bkash" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-cocoa-dark">
                      bKash (Manual)
                    </p>
                    <p className="text-xs text-cocoa-light">
                      Send money to our bKash number
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  disabled={loading}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                    paymentMethod === "nagad"
                      ? "border-gold bg-gold/5"
                      : "border-cocoa/10 hover:border-cocoa/30"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "nagad"
                        ? "border-gold"
                        : "border-cocoa/30"
                    }`}
                  >
                    {paymentMethod === "nagad" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-cocoa-dark">
                      Nagad (Manual)
                    </p>
                    <p className="text-xs text-cocoa-light">
                      Send money to our Nagad number
                    </p>
                  </div>
                </button>
              </div>

              <div className="mt-4 p-3 bg-cream rounded-lg text-xs text-cocoa-light">
                ⓘ Payment verification will happen after order placement.
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5 sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-cocoa/10 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-cream shrink-0 flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">
                          {item.imageEmoji || "🍫"}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-cocoa-dark truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-cocoa-light">
                        ৳{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-cocoa-dark">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-b border-cocoa/10">
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Subtotal</span>
                  <span className="font-medium text-cocoa-dark">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Delivery Charge</span>
                  <span className="font-medium text-cocoa-dark">
                    ৳{deliveryCharge}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline py-4">
                <span className="font-serif text-lg font-bold text-cocoa-dark">
                  Total
                </span>
                <span className="font-serif text-3xl font-bold text-cocoa-dark">
                  ৳{total.toLocaleString()}
                </span>
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
                {loading ? "Placing Order..." : "Place Order →"}
              </button>

              <p className="text-xs text-gray text-center mt-3">
                By placing this order, you agree to our terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}