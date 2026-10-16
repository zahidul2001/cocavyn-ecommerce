"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

// ============================================
// COCAVYN - Cart Page
// /cart
// Shopping cart with items, quantity, subtotal
// ============================================

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, isLoaded } = useCart();

  // Loading state (localStorage not yet loaded)
  if (!isLoaded) {
    return (
      <div className="bg-cream min-h-screen py-16">
        <div className="container-custom text-center">
          <div className="text-6xl mb-4">🍫</div>
          <p className="text-cocoa-light">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="bg-cream min-h-screen py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-cocoa-light text-lg mb-8">
              Looks like you haven't added any chocolate yet.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Start Shopping →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const deliveryCharge = 0; // Stage 11-এ full
  const total = subtotal + deliveryCharge;

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray mb-4">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cocoa-dark">Cart</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-2">
            Shopping Cart
          </h1>
          <p className="text-cocoa-light">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 md:p-6 border border-cocoa/5 flex gap-4"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.slug}`}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-cream shrink-0 flex items-center justify-center"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">{item.imageEmoji || "🍫"}</span>
                  )}
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-2 mb-2">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-serif text-lg md:text-xl font-bold text-cocoa-dark hover:text-gold transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray hover:text-red-600 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  <p className="text-sm text-gray mb-3">
                    ৳{item.price} each
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-auto">
                    {/* Quantity Controls */}
                    <div className="inline-flex items-center border border-cocoa/20 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1.5 text-cocoa-dark hover:bg-cream transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-4 py-1.5 font-medium text-cocoa-dark border-x border-cocoa/20 min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className={`px-3 py-1.5 transition-colors ${
                          item.quantity >= item.stock
                            ? "text-gray cursor-not-allowed"
                            : "text-cocoa-dark hover:bg-cream"
                        }`}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="font-serif text-xl font-bold text-cocoa-dark">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link
                href="/shop"
                className="text-sm text-gold hover:text-gold-dark transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeftIcon />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5 sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-6">
                Order Summary
              </h2>

              {/* Summary Lines */}
              <div className="space-y-3 pb-6 border-b border-cocoa/10">
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Subtotal</span>
                  <span className="font-medium text-cocoa-dark">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Delivery Charge</span>
                  <span className="font-medium text-cocoa-dark">
                    {deliveryCharge > 0
                      ? `৳${deliveryCharge}`
                      : "Calculated at checkout"}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline py-6">
                <span className="font-serif text-lg font-bold text-cocoa-dark">
                  Total
                </span>
                <span className="font-serif text-3xl font-bold text-cocoa-dark">
                  ৳{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="btn btn-primary w-full justify-center mb-3"
              >
                Proceed to Checkout →
              </Link>

              <p className="text-xs text-gray text-center">
                Delivery charge calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function TrashIcon() {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}