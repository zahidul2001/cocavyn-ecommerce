import Link from "next/link";

// ============================================
// COCAVYN - Categories Section
// Chocolate categories grid
// NOTE: Categories will become database-driven in Stage 5
// ============================================

export default function Categories() {
  // Temporary hardcoded categories (will be from DB later)
  const categories = [
    { name: "Milk Chocolate", icon: "🍫", slug: "milk-chocolate" },
    { name: "Dark Chocolate", icon: "🍩", slug: "dark-chocolate" },
    { name: "White Chocolate", icon: "🍰", slug: "white-chocolate" },
    { name: "Gift Box", icon: "🎁", slug: "gift-box" },
    { name: "Chocolate Bouquet", icon: "💐", slug: "chocolate-bouquet" },
    { name: "Nuts & Chocolate", icon: "🌰", slug: "nuts-chocolate" },
    { name: "Chocolate Strawberry", icon: "🍓", slug: "chocolate-strawberry" },
    { name: "Chocolate Cake", icon: "🎂", slug: "chocolate-cake" },
  ];

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
             Find your favorite chocolate — milk, dark, white, gift box and much more.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group bg-white rounded-2xl p-6 md:p-8 text-center border border-cocoa/5 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>

              {/* Name */}
              <h3 className="font-serif text-base md:text-lg font-bold text-cocoa-dark group-hover:text-gold transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
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