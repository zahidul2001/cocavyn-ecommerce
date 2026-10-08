import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

// ============================================
// COCAVYN - Featured Products Section
// Homepage-এ featured chocolate দেখাবে
// NOTE: Temporary hardcoded data - Stage 9-এ database থেকে আসবে
// ============================================

export default function FeaturedProducts() {
  // Temporary fake products - will come from database in Stage 9
  const products = [
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
      category: "Dark Chocolate",
      stock: 25,
      isFeatured: true,
    },
    {
      id: "2",
      name: "Milk Chocolate Delight",
      slug: "milk-chocolate-delight",
      price: 350,
      rating: 4.6,
      reviewCount: 89,
      imageEmoji: "🍩",
      category: "Milk Chocolate",
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
      category: "Gift Box",
      stock: 12,
      isFeatured: true,
    },
    {
      id: "4",
      name: "Chocolate Strawberry",
      slug: "chocolate-strawberry",
      price: 800,
      rating: 4.7,
      reviewCount: 156,
      imageEmoji: "🍓",
      category: "Chocolate Strawberry",
      stock: 0, // Out of stock example
    },
  ];

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
            Our best chocolate collection — the ones our customers love the most.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
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