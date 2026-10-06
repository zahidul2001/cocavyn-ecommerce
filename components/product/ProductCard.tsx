"use client";

import Link from "next/link";
import { useState } from "react";

// ============================================
// COCAVYN - Product Card Component
// Reusable product card for Homepage, Shop, etc.
// ============================================

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  previousPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  imageEmoji?: string; // Temporary - will become image URL later
  category?: string;
  stock?: number;
  isFeatured?: boolean;
}

export default function ProductCard({
  name,
  slug,
  price,
  previousPrice,
  discount,
  rating = 4.5,
  reviewCount = 0,
  imageEmoji = "🍫",
  category,
  stock = 10,
  isFeatured,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    // Reset after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
    // TODO: Stage 10 - Real cart logic
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Stage 16 - Real wishlist logic
  };

  const isOutOfStock = stock === 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-cocoa/5 hover:border-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Area */}
      <div className="relative aspect-square bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center overflow-hidden">
        {/* Discount Badge */}
        {discount && discount > 0 && (
          <span className="absolute top-3 left-3 bg-gold text-cocoa-dark text-xs font-bold px-2.5 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}

        {/* Featured Badge */}
        {isFeatured && !discount && (
          <span className="absolute top-3 left-3 bg-cocoa text-cream text-xs font-bold px-2.5 py-1 rounded-full z-10">
            Featured
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-cocoa-dark hover:text-rose transition-all z-10 shadow-sm"
          aria-label="Add to wishlist"
        >
          <HeartIcon filled={isWishlisted} />
        </button>

        {/* Product Emoji (Placeholder - will become image) */}
        <Link
          href={`/products/${slug}`}
          className="text-8xl md:text-9xl group-hover:scale-110 transition-transform duration-500"
        >
          {imageEmoji}
        </Link>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-cocoa-dark/60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-cream text-cocoa-dark text-sm font-bold px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* Category */}
        {category && (
          <span className="text-xs text-gray uppercase tracking-wide mb-2">
            {category}
          </span>
        )}

        {/* Product Name */}
        <Link href={`/products/${slug}`}>
          <h3 className="font-serif text-base md:text-lg font-bold text-cocoa-dark hover:text-gold transition-colors line-clamp-2 mb-2 min-h-[3rem]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= Math.round(rating)} />
            ))}
          </div>
          <span className="text-xs text-gray">
            {rating.toFixed(1)} {reviewCount > 0 && `(${reviewCount})`}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-serif text-xl md:text-2xl font-bold text-cocoa-dark">
            ৳{price}
          </span>
          {previousPrice && previousPrice > price && (
            <span className="text-sm text-gray line-through">
              ৳{previousPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`mt-auto w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? "bg-gray-light text-gray cursor-not-allowed"
              : addedToCart
              ? "bg-success text-white"
              : "bg-cocoa text-cream hover:bg-cocoa-dark"
          }`}
        >
          {isOutOfCartState(addedToCart, isOutOfStock)}
        </button>
      </div>
    </div>
  );
}

function isOutOfCartState(addedToCart: boolean, isOutOfStock: boolean) {
  if (isOutOfStock) {
    return (
      <>
        <span>Out of Stock</span>
      </>
    );
  }
  if (addedToCart) {
    return (
      <>
        <CheckSmallIcon />
        <span>Added!</span>
      </>
    );
  }
  return (
    <>
      <CartSmallIcon />
      <span>Add to Cart</span>
    </>
  );
}

// ============================================
// Icons
// ============================================

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-gold" : "text-gray-light"}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CartSmallIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
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
  );
}