import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Product Details Page
// Dynamic route: /products/[slug]
// Database-driven — Stage 9.3
// ============================================

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch product by slug
  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      description,
      short_description,
      price,
      previous_price,
      stock,
      sku,
      rating,
      review_count,
      image_url,
      category_id,
      is_active,
      is_featured,
      is_best_seller,
      created_at,
      categories (
        id,
        name,
        slug
      )
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  // If not found → 404
  if (error || !product) {
    notFound();
  }

  // Fetch related products (same category, exclude current)
  let relatedProducts: any[] = [];

  if (product.category_id) {
    const { data: related } = await supabase
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
        is_active,
        is_featured,
        categories (
          name
        )
      `
      )
      .eq("category_id", product.category_id)
      .eq("is_active", true)
      .neq("id", product.id)
      .limit(4);

    relatedProducts = related || [];
  }

  // If less than 4 related products, fill with other products
  if (relatedProducts.length < 4) {
    const { data: others } = await supabase
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
        is_active,
        is_featured,
        categories (
          name
        )
      `
      )
      .eq("is_active", true)
      .neq("id", product.id)
      .neq("category_id", product.category_id || "")
      .limit(4 - relatedProducts.length);

    relatedProducts = [...relatedProducts, ...(others || [])];
  }

  const isOutOfStock = product.stock === 0;
  const discount =
    product.previous_price && product.previous_price > product.price
      ? Math.round(
          ((product.previous_price - product.price) / product.previous_price) *
            100
        )
      : 0;

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-4">
          <nav className="text-sm text-gray">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-gold">
              Shop
            </Link>
            {product.categories && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/shop?category=${(product.categories as any)?.slug}`}
                  className="hover:text-gold"
                >
                  {(product.categories as any)?.name}
                </Link>
              </>
            )}
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
                {discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gold text-cocoa-dark text-sm font-bold px-3 py-1.5 rounded-full z-10">
                    -{discount}%
                  </span>
                )}

                {/* Featured Badge */}
                {product.is_featured && discount === 0 && (
                  <span className="absolute top-4 left-4 bg-cocoa text-cream text-sm font-bold px-3 py-1.5 rounded-full z-10">
                    Featured
                  </span>
                )}

                {/* Product Image */}
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[180px] md:text-[220px]">🍫</span>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-cocoa-dark/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-cream text-cocoa-dark text-lg font-bold px-6 py-3 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            {/* Category */}
            {product.categories && (
              <Link
                href={`/shop?category=${(product.categories as any)?.slug}`}
                className="inline-block text-gold text-sm font-medium uppercase tracking-wider mb-3 hover:text-gold-dark"
              >
                {(product.categories as any)?.name}
              </Link>
            )}

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
                    fill={
                      star <= Math.round(Number(product.rating))
                        ? "currentColor"
                        : "none"
                    }
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      star <= Math.round(Number(product.rating))
                        ? "text-gold"
                        : "text-gray-light"
                    }
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray">
                {Number(product.rating).toFixed(1)} ({product.review_count || 0}{" "}
                reviews)
              </span>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-cocoa-light text-lg mb-6 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark">
                ৳{Number(product.price).toLocaleString()}
              </span>
              {product.previous_price &&
                product.previous_price > product.price && (
                  <>
                    <span className="text-xl text-gray line-through">
                      ৳{Number(product.previous_price).toLocaleString()}
                    </span>
                    <span className="text-sm bg-gold/20 text-cocoa-dark px-2 py-1 rounded-full font-medium">
                      Save ৳
                      {(
                        Number(product.previous_price) - Number(product.price)
                      ).toLocaleString()}
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
            {(product.sku || product.categories) && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-cream-dark rounded-xl border border-cocoa/5">
                {product.sku && (
                  <div>
                    <p className="text-xs text-gray uppercase tracking-wider mb-1">
                      SKU
                    </p>
                    <p className="font-medium text-cocoa-dark font-mono text-sm">
                      {product.sku}
                    </p>
                  </div>
                )}
                {product.categories && (
                  <div>
                    <p className="text-xs text-gray uppercase tracking-wider mb-1">
                      Category
                    </p>
                    <p className="font-medium text-cocoa-dark">
                      {(product.categories as any)?.name}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Description Section */}
        {product.description && (
          <div className="mt-16">
            <div className="border-b border-cocoa/10 mb-8">
              <h2 className="pb-4 text-cocoa-dark font-serif text-2xl font-bold">
                Description
              </h2>
            </div>
            <div className="max-w-4xl">
              <p className="text-cocoa-light leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-3">
                You May Also Like
              </h2>
              <p className="text-cocoa-light">
                More chocolate you might enjoy
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id}
                  id={related.id}
                  name={related.name}
                  slug={related.slug}
                  price={Number(related.price)}
                  previousPrice={
                    related.previous_price
                      ? Number(related.previous_price)
                      : undefined
                  }
                  discount={
                    related.previous_price &&
                    related.previous_price > related.price
                      ? Math.round(
                          ((related.previous_price - related.price) /
                            related.previous_price) *
                            100
                        )
                      : undefined
                  }
                  rating={Number(related.rating) || 0}
                  reviewCount={related.review_count || 0}
                  imageUrl={related.image_url || undefined}
                  category={related.categories?.name}
                  stock={related.stock}
                  isFeatured={related.is_featured}
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