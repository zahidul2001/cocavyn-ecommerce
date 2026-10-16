import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Featured Products Section
// Homepage-এ featured chocolate from database
// Stage 9.4.2 — Database-driven
// ============================================

export default async function FeaturedProducts() {
  const supabase = await createClient();

  // Fetch featured products
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
      is_featured,
      categories (
        name
      )
    `
    )
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  // If no featured products, don't render section
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-cream-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
            Our Best
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-4">
            Featured Products
          </h2>
          <p className="text-cocoa-light text-lg max-w-2xl mx-auto">
            Our best chocolate collection — the ones our customers love the
            most.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn btn-primary">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}