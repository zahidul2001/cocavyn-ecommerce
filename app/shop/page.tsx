import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Shop Page
// /shop
// Shows all products from database
// ============================================

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category || "";
  const sortBy = params.sort || "newest";

  const supabase = await createClient();

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("display_order");

  // Build products query
  let query = supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      short_description,
      price,
      previous_price,
      stock,
      rating,
      review_count,
      image_url,
      category_id,
      is_featured,
      is_best_seller,
      categories (
        id,
        name,
        slug
      )
    `
    )
    .eq("is_active", true);

  // Filter by category if selected
  if (selectedCategory) {
    // Get category id from slug
    const category = categories?.find((c) => c.slug === selectedCategory);
    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  // Sorting
  switch (sortBy) {
    case "price-low":
      query = query.order("price", { ascending: true });
      break;
    case "price-high":
      query = query.order("price", { ascending: false });
      break;
    case "rating":
      query = query.order("rating", { ascending: false });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data: products, error } = await query;

  // Get product counts for each category
  const { data: allProducts } = await supabase
    .from("products")
    .select("category_id")
    .eq("is_active", true);

  const getCategoryCount = (categoryId: string) => {
    return allProducts?.filter((p) => p.category_id === categoryId).length || 0;
  };

  // Find selected category name
  const selectedCategoryName = selectedCategory
    ? categories?.find((c) => c.slug === selectedCategory)?.name
    : null;

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
            <Link href="/shop" className="hover:text-gold">
              Shop
            </Link>
            {selectedCategoryName && (
              <>
                <span className="mx-2">/</span>
                <span className="text-cocoa-dark">{selectedCategoryName}</span>
              </>
            )}
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-2">
            {selectedCategoryName || "All Chocolate"}
          </h1>
          <p className="text-cocoa-light">
            {products?.length || 0} product
            {(products?.length || 0) !== 1 ? "s" : ""} found
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
                        {allProducts?.length || 0}
                      </span>
                    </Link>
                  </li>
                  {categories?.map((category) => {
                    const count = getCategoryCount(category.id);
                    return (
                      <li key={category.id}>
                        <Link
                          href={`/shop?category=${category.slug}`}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === category.slug
                              ? "bg-cocoa text-cream font-medium"
                              : "text-cocoa-light hover:bg-cream"
                          }`}
                        >
                          {category.name}
                          <span className="float-right text-xs">{count}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price Filter (placeholder for Stage 10) */}
              <div>
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
                  (Coming in Stage 10)
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
                  {products?.length || 0}
                </span>{" "}
                products
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray">Sort by:</label>
                <SortDropdown
                  currentSort={sortBy}
                  category={selectedCategory}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
                Error loading products: {error.message}
              </div>
            )}

            {/* Products */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={Number(product.price)}
                    previousPrice={
                      product.previous_price
                        ? Number(product.previous_price)
                        : undefined
                    }
                    discount={
                      product.previous_price && product.previous_price > product.price
                        ? Math.round(
                            ((product.previous_price - product.price) /
                              product.previous_price) *
                              100
                          )
                        : undefined
                    }
                    rating={Number(product.rating) || 0}
                    reviewCount={product.review_count || 0}
                    imageUrl={product.image_url || undefined}
                    category={product.categories?.name}
                    stock={product.stock}
                    isFeatured={product.is_featured}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-cocoa/5">
                <div className="text-6xl mb-4">🍫</div>
                <h3 className="font-serif text-2xl font-bold text-cocoa-dark mb-2">
                  No products found
                </h3>
                <p className="text-gray mb-6">
                  {selectedCategory
                    ? "This category has no products yet."
                    : "No products available at the moment."}
                </p>
                <Link href="/shop" className="btn btn-primary">
                  View All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Sort Dropdown Component
// ============================================

function SortDropdown({
  currentSort,
  category,
}: {
  currentSort: string;
  category: string;
}) {
  const options = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
  ];

  const baseUrl = category ? `/shop?category=${category}` : "/shop";

  return (
    <div className="flex items-center gap-2">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`${baseUrl}${category ? "&" : "?"}sort=${option.value}`}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            currentSort === option.value
              ? "bg-cocoa text-cream"
              : "bg-cream text-cocoa-dark hover:bg-cream-dark"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}