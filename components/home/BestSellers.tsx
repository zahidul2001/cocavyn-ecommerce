import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Best Sellers Section
// Homepage-এ best seller chocolate from database
// Stage 9.4.3 — Database-driven
// ============================================

export default async function BestSellers() {
  const supabase = await createClient();

  // Fetch best seller products
  const { data: products } = await supabase
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
      is_best_seller,
      categories (
        name
      )
    `
    )
    .eq("is_active", true)
    .eq("is_best_seller", true)
    .order("created_at", { ascending: false })
    .limit(3);

  // If no best sellers, don't render section
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
            Top Rated
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-4">
            Best Sellers
          </h2>
          <p className="text-cocoa-light text-lg max-w-2xl mx-auto">
            Our most popular chocolate — loved and trusted by hundreds of
            customers.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product: any, index: number) => (
            <div key={product.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-3 -left-3 z-20 bg-gold text-cocoa-dark w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="font-serif text-xl font-bold">
                  #{index + 1}
                </span>
              </div>

              {/* Product Card */}
              <ProductCard
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
                  product.previous_price &&
                  product.previous_price > product.price
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
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn btn-primary">
            View All Best Sellers →
          </Link>
        </div>
      </div>
    </section>
  );
}