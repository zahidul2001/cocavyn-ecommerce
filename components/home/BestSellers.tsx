import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Best Sellers Section
// Homepage-এ সবচেয়ে বেশি বিক্রি হওয়া chocolate
// NOTE: Temporary hardcoded data - Stage 9-এ database থেকে আসবে
// ============================================

export default function BestSellers() {
  // Temporary fake data - will come from database in Stage 9
  const bestSellers = [
    {
      id: "1",
      name: "Premium Dark Chocolate Box",
      slug: "premium-dark-chocolate-box",
      price: 850,
      previousPrice: 1100,
      discount: 23,
      rating: 4.9,
      reviewCount: 342,
      imageEmoji: "🍫",
      category: "Dark Chocolate",
      stock: 45,
      rank: 1,
    },
    {
      id: "2",
      name: "Luxury Chocolate Gift Hamper",
      slug: "luxury-chocolate-gift-hamper",
      price: 1500,
      previousPrice: 1800,
      discount: 17,
      rating: 4.8,
      reviewCount: 289,
      imageEmoji: "🎁",
      category: "Gift Box",
      stock: 22,
      rank: 2,
    },
    {
      id: "3",
      name: "Milk Chocolate Truffle Collection",
      slug: "milk-chocolate-truffle-collection",
      price: 650,
      rating: 4.7,
      reviewCount: 198,
      imageEmoji: "🍩",
      category: "Milk Chocolate",
      stock: 38,
      rank: 3,
    },
  ];

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
            Our most popular chocolate — loved and trusted by hundreds of customers.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {bestSellers.map((product) => (
            <div key={product.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-3 -left-3 z-20 bg-gold text-cocoa-dark w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <span className="font-serif text-xl font-bold">
                  #{product.rank}
                </span>
              </div>

              {/* Product Card */}
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/best-sellers" className="btn btn-primary">
            View All Best Sellers →
          </Link>
        </div>
      </div>
    </section>
  );
}