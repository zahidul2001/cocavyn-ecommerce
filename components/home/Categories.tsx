import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Categories Section
// Homepage-এ category grid from database
// Stage 9.4.1 — Database-driven
// ============================================

// Category icon mapping (visual only, since database stores text)
const CATEGORY_ICONS: Record<string, string> = {
  "milk-chocolate": "🍫",
  "dark-chocolate": "🍩",
  "white-chocolate": "🍰",
  "gift-box": "🎁",
  "chocolate-bouquet": "💐",
  "nuts-chocolate": "🌰",
  "chocolate-strawberry": "🍓",
  "chocolate-cake": "🎂",
};

export default async function Categories() {
  const supabase = await createClient();

  // Fetch active categories
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(8);

  // If no categories, don't render
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-cream">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
            Categories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-4">
            Shop by Category
          </h2>
          <p className="text-cocoa-light text-lg max-w-2xl mx-auto">
            Find your favorite chocolate — milk, dark, white, gift boxes and
            more.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const icon = CATEGORY_ICONS[category.slug] || "🍫";

            return (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group bg-white rounded-2xl p-6 md:p-8 text-center border border-cocoa/5 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>

                {/* Name */}
                <h3 className="font-serif text-base md:text-lg font-bold text-cocoa-dark group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn btn-primary">
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}