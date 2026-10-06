import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Shop Page
// All products with category filter (URL-based)
// NOTE: Temporary hardcoded data - Stage 9-এ database থেকে আসবে
// ============================================

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

// Temporary category list (will come from DB later)
const CATEGORIES = [
  { name: "Milk Chocolate", slug: "milk-chocolate", count: 12 },
  { name: "Dark Chocolate", slug: "dark-chocolate", count: 8 },
  { name: "White Chocolate", slug: "white-chocolate", count: 6 },
  { name: "Gift Box", slug: "gift-box", count: 15 },
  { name: "Chocolate Bouquet", slug: "chocolate-bouquet", count: 4 },
  { name: "Nuts & Chocolate", slug: "nuts-chocolate", count: 9 },
  { name: "Chocolate Strawberry", slug: "chocolate-strawberry", count: 5 },
  { name: "Chocolate Cake", slug: "chocolate-cake", count: 7 },
];

// Temporary product list (will come from DB later)
const ALL_PRODUCTS = [
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
  },
];

export default async function ShopPage({ searchParams }: ShopPageProps) {
  // Next.js 16: searchParams is a Promise
  const params = await searchParams;
  const selectedCategory = params.category || "";

  // Filter products by category (if selected)
  const filteredProducts = selectedCategory
    ? ALL_PRODUCTS.filter((p) => p.category === selectedCategory)
    : ALL_PRODUCTS;

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
            <span className="text-cocoa-dark">Shop</span>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <span className="text-cocoa-dark">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                    selectedCategory}
                </span>
              </>
            )}
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-2">
            {selectedCategory
              ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name
              : "All Chocolate"}
          </h1>
          <p className="text-cocoa-light">
            মোট {filteredProducts.length}টি product পাওয়া যাচ্ছে
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5 sticky top-24">
              {/* Categories Filter */}
              <div className="mb-8">
                <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/shop"
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        !selectedCategory
                          ? "bg-cocoa text-cream font-medium"
                          : "text-cocoa-light hover:bg-cream"
                      }`}
                    >
                      All Products
                      <span className="float-right text-xs">
                        {ALL_PRODUCTS.length}
                      </span>
                    </Link>
                  </li>
                  {CATEGORIES.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/shop?category=${category.slug}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.slug
                            ? "bg-cocoa text-cream font-medium"
                            : "text-cocoa-light hover:bg-cream"
                        }`}
                      >
                        {category.name}
                        <span className="float-right text-xs">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter (placeholder) */}
              <div className="mb-8">
                <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                  Price Range
                </h3>
                <ul className="space-y-2 text-sm text-cocoa-light">
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cocoa" />
                    <span>৳0 - ৳500</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cocoa" />
                    <span>৳500 - ৳1000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cocoa" />
                    <span>৳1000+</span>
                  </li>
                </ul>
                <p className="text-xs text-gray mt-3 italic">
                  (Stage 9-এ filtering কাজ করবে)
                </p>
              </div>

              {/* Rating Filter (placeholder) */}
              <div>
                <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                  Rating
                </h3>
                <ul className="space-y-2 text-sm text-cocoa-light">
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cocoa" />
                    <span>4★ & up</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cocoa" />
                    <span>3★ & up</span>
                  </li>
                </ul>
                <p className="text-xs text-gray mt-3 italic">
                  (Stage 9-এ filtering কাজ করবে)
                </p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl p-4 mb-6 border border-cocoa/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray">
                Showing{" "}
                <span className="text-cocoa-dark font-medium">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray">Sort by:</label>
                <select className="bg-cream border border-cocoa/10 rounded-lg px-3 py-1.5 text-sm text-cocoa-dark focus:outline-none focus:border-gold">
                  <option>Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-cocoa/5">
                <div className="text-6xl mb-4">🍫</div>
                <h3 className="font-serif text-2xl font-bold text-cocoa-dark mb-2">
                  কোনো product পাওয়া যায়নি
                </h3>
                <p className="text-gray mb-6">
                  এই category-তে এখনো কোনো product যোগ করা হয়নি।
                </p>
                <Link href="/shop" className="btn btn-primary">
                  সব Products দেখুন
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    previousPrice={product.previousPrice}
                    discount={product.discount}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    imageEmoji={product.imageEmoji}
                    category={product.categoryName}
                    stock={product.stock}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}