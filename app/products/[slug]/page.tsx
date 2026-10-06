import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Product Details Page
// Dynamic route: /products/[slug]
// NOTE: Temporary hardcoded data - Stage 9-এ database থেকে আসবে
// ============================================

// Temporary products database (will come from DB later)
const PRODUCTS = [
  {
    id: "1",
    name: "Premium Dark Chocolate",
    slug: "premium-dark-chocolate",
    price: 500,
    previousPrice: 650,
    discount: 23,
    rating: 4.8,
    reviewCount: 124,
    imageEmoji: "🍫",
    category: "dark-chocolate",
    categoryName: "Dark Chocolate",
    stock: 25,
    shortDescription: "৭০% cocoa-এর premium dark chocolate। Rich, intense flavor।",
    description:
      "আমাদের Premium Dark Chocolate তৈরি হয় ৭০% pure cocoa দিয়ে। প্রতিটা bite-এ আপনি পাবেন rich, intense chocolate flavor যা চকলেট প্রেমীদের মন ছুঁয়ে যাবে। Perfect for gifting অথবা নিজের জন্য।",
    ingredients: "Cocoa mass, cocoa butter, sugar, vanilla extract, soy lecithin",
    weight: "100g",
    flavor: "Dark, Rich, Intense",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Milk Chocolate Delight",
    slug: "milk-chocolate-delight",
    price: 350,
    rating: 4.6,
    reviewCount: 89,
    imageEmoji: "🍩",
    category: "milk-chocolate",
    categoryName: "Milk Chocolate",
    stock: 18,
    shortDescription: "Creamy milk chocolate — perfect for মিষ্টি lovers।",
    description:
      "Milk Chocolate Delight — নরম, ক্রিমি এবং মিষ্টি। যারা milk chocolate ভালোবাসেন তাদের জন্য perfect। প্রতিটা bite-এ creamy sweetness।",
    ingredients: "Sugar, cocoa butter, milk powder, cocoa mass, soy lecithin",
    weight: "120g",
    flavor: "Creamy, Sweet",
  },
  {
    id: "3",
    name: "Luxury Gift Box",
    slug: "luxury-gift-box",
    price: 1200,
    previousPrice: 1500,
    discount: 20,
    rating: 4.9,
    reviewCount: 210,
    imageEmoji: "🎁",
    category: "gift-box",
    categoryName: "Gift Box",
    stock: 12,
    shortDescription: "Premium gift box — ভালোবাসার মানুষকে দেওয়ার জন্য perfect।",
    description:
      "Luxury Gift Box — 12 varieties-এর chocolate assortment, সুন্দর packaging-এ। জন্মদিন, বিবাহবার্ষিকী অথবা যেকোনো special occasion-এর জন্য ideal gift।",
    ingredients: "Assorted chocolates, gift packaging",
    weight: "250g",
    flavor: "Assorted",
  },
  {
    id: "4",
    name: "Chocolate Strawberry",
    slug: "chocolate-strawberry",
    price: 800,
    rating: 4.7,
    reviewCount: 156,
    imageEmoji: "🍓",
    category: "chocolate-strawberry",
    categoryName: "Chocolate Strawberry",
    stock: 0,
    shortDescription: "Fresh strawberry + premium chocolate — romantic combination।",
    description:
      "Chocolate Strawberry — তাজা স্ট্রবেরির উপর premium chocolate coating। Romantic occasions-এর জন্য perfect।",
    ingredients: "Fresh strawberry, dark chocolate, cocoa butter",
    weight: "150g",
    flavor: "Fruity, Sweet",
  },
  {
    id: "5",
    name: "White Chocolate Truffle",
    slug: "white-chocolate-truffle",
    price: 600,
    previousPrice: 750,
    discount: 20,
    rating: 4.5,
    reviewCount: 78,
    imageEmoji: "🍰",
    category: "white-chocolate",
    categoryName: "White Chocolate",
    stock: 22,
    shortDescription: "Creamy white chocolate truffle — delicate & delicious।",
    description:
      "White Chocolate Truffle — নরম, delicate এবং highly creamy। White chocolate-এর প্রতিটা bite-এ premium quality।",
    ingredients: "Cocoa butter, milk powder, sugar, vanilla",
    weight: "100g",
    flavor: "Creamy, Vanilla",
  },
  {
    id: "6",
    name: "Chocolate Bouquet Premium",
    slug: "chocolate-bouquet-premium",
    price: 1800,
    rating: 4.8,
    reviewCount: 134,
    imageEmoji: "💐",
    category: "chocolate-bouquet",
    categoryName: "Chocolate Bouquet",
    stock: 6,
    shortDescription: "Chocolate-এর ফুল — unique এবং memorable gift।",
    description:
      "Chocolate Bouquet Premium — chocolate-এর হাত-বানানো bouquet। যেকোনো উপলক্ষ্যে অসাধারণ surprise।",
    ingredients: "Assorted chocolates, decorative wrap",
    weight: "300g",
    flavor: "Assorted",
  },
  {
    id: "7",
    name: "Nuts Chocolate Assortment",
    slug: "nuts-chocolate-assortment",
    price: 750,
    rating: 4.6,
    reviewCount: 92,
    imageEmoji: "🌰",
    category: "nuts-chocolate",
    categoryName: "Nuts & Chocolate",
    stock: 15,
    shortDescription: "Premium nuts + chocolate — crunchy combination।",
    description:
      "Nuts Chocolate Assortment — বাদাম এবং chocolate-এর perfect blend। Crunchy texture, rich flavor।",
    ingredients: "Almonds, cashews, pistachios, chocolate, sugar",
    weight: "150g",
    flavor: "Nutty, Rich",
  },
  {
    id: "8",
    name: "Chocolate Cake Special",
    slug: "chocolate-cake-special",
    price: 950,
    previousPrice: 1200,
    discount: 21,
    rating: 4.7,
    reviewCount: 167,
    imageEmoji: "🎂",
    category: "chocolate-cake",
    categoryName: "Chocolate Cake",
    stock: 9,
    shortDescription: "Chocolate cake — birthdays-এর জন্য perfect।",
    description:
      "Chocolate Cake Special — moist chocolate cake layers, premium cocoa দিয়ে তৈরি। জন্মদিন অথবা যেকোনো celebration-এর জন্য।",
    ingredients: "Flour, cocoa powder, sugar, eggs, butter, cream",
    weight: "500g",
    flavor: "Chocolate, Rich",
  },
];

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Next.js 16: params is a Promise
  const { slug } = await params;

  // Find product by slug
  const product = PRODUCTS.find((p) => p.slug === slug);

  // If product not found → 404
  if (!product) {
    notFound();
  }

  // Find related products (same category, exclude current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  // If less than 4 related, fill with random
  if (relatedProducts.length < 4) {
    const others = PRODUCTS.filter(
      (p) =>
        p.category !== product.category && p.slug !== product.slug
    ).slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-4">
          <nav className="text-sm text-gray">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-gold">Shop</Link>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-gold"
            >
              {product.categoryName}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cocoa-dark">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image */}
          <div>
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="relative aspect-square bg-gradient-to-br from-cream to-cream-dark rounded-2xl overflow-hidden border border-cocoa/5">
                {/* Discount Badge */}
                {product.discount && product.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gold text-cocoa-dark text-sm font-bold px-3 py-1.5 rounded-full z-10">
                    -{product.discount}%
                  </span>
                )}

                {/* Product Emoji */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-[180px] md:text-[220px]">
                    {product.imageEmoji}
                  </div>
                </div>

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-cocoa-dark/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-cream text-cocoa-dark text-lg font-bold px-6 py-3 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[product.imageEmoji, product.imageEmoji, product.imageEmoji, product.imageEmoji].map((emoji, i) => (
                  <button
                    key={i}
                    className="aspect-square bg-cream-dark rounded-lg border border-cocoa/5 hover:border-gold transition-colors flex items-center justify-center text-3xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            {/* Category */}
            <Link
              href={`/shop?category=${product.category}`}
              className="inline-block text-gold text-sm font-medium uppercase tracking-wider mb-3 hover:text-gold-dark"
            >
              {product.categoryName}
            </Link>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cocoa-dark mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={star <= Math.round(product.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className={star <= Math.round(product.rating) ? "text-gold" : "text-gray-light"}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Short Description */}
            <p className="text-cocoa-light text-lg mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark">
                ৳{product.price}
              </span>
              {product.previousPrice && product.previousPrice > product.price && (
                <>
                  <span className="text-xl text-gray line-through">
                    ৳{product.previousPrice}
                  </span>
                  <span className="text-sm bg-gold/20 text-cocoa-dark px-2 py-1 rounded-full font-medium">
                    Save ৳{product.previousPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {isOutOfStock ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-error" />
                  <span className="text-error font-medium">Out of Stock</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-success font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-cocoa-dark mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-cocoa/20 rounded-lg overflow-hidden">
                  <button className="px-4 py-2 text-cocoa-dark hover:bg-cream-dark transition-colors">
                    −
                  </button>
                  <span className="px-6 py-2 font-medium text-cocoa-dark border-x border-cocoa/20">
                    1
                  </span>
                  <button className="px-4 py-2 text-cocoa-dark hover:bg-cream-dark transition-colors">
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? "bg-gray-light text-gray cursor-not-allowed"
                    : "bg-cocoa text-cream hover:bg-cocoa-dark"
                }`}
              >
                <CartIcon />
                <span>Add to Cart</span>
              </button>
              <button
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 rounded-lg font-medium transition-all duration-200 ${
                  isOutOfStock
                    ? "bg-gray-light text-gray cursor-not-allowed"
                    : "bg-gold text-cocoa-dark hover:bg-gold-dark"
                }`}
              >
                Buy Now
              </button>
              <button
                className="p-3.5 rounded-lg border-2 border-cocoa/20 text-cocoa-dark hover:border-rose hover:text-rose transition-all"
                aria-label="Add to wishlist"
              >
                <HeartIcon />
              </button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-cream-dark rounded-xl border border-cocoa/5">
              <div>
                <p className="text-xs text-gray uppercase tracking-wider mb-1">
                  Weight
                </p>
                <p className="font-medium text-cocoa-dark">{product.weight}</p>
              </div>
              <div>
                <p className="text-xs text-gray uppercase tracking-wider mb-1">
                  Flavor
                </p>
                <p className="font-medium text-cocoa-dark">{product.flavor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Tabs */}
        <div className="mt-16">
          <div className="border-b border-cocoa/10 mb-8">
            <div className="flex gap-8 overflow-x-auto">
              <button className="pb-4 border-b-2 border-cocoa text-cocoa-dark font-medium whitespace-nowrap">
                Description
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray hover:text-cocoa-dark whitespace-nowrap">
                Ingredients
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray hover:text-cocoa-dark whitespace-nowrap">
                Delivery Info
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray hover:text-cocoa-dark whitespace-nowrap">
                Reviews ({product.reviewCount})
              </button>
            </div>
          </div>
          <div className="max-w-4xl">
            <p className="text-cocoa-light leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="text-cocoa-light leading-relaxed">
              <strong className="text-cocoa-dark">Ingredients:</strong> {product.ingredients}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-3">
                You May Also Like
              </h2>
              <p className="text-cocoa-light">
                একই ধরনের আরো কিছু chocolate
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id}
                  id={related.id}
                  name={related.name}
                  slug={related.slug}
                  price={related.price}
                  previousPrice={related.previousPrice}
                  discount={related.discount}
                  rating={related.rating}
                  reviewCount={related.reviewCount}
                  imageEmoji={related.imageEmoji}
                  category={related.categoryName}
                  stock={related.stock}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function CartIcon() {
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
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function HeartIcon() {
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
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}