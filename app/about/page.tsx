import Link from "next/link";

// ============================================
// COCAVYN - About Us Page
// Business story and values
// ============================================

export const metadata = {
  title: "About Us",
  description:
    "Learn about COCAVYN — Bangladesh's premium chocolate shop. Our story, our values, and our passion for premium chocolate.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-10 md:py-14">
          <nav className="text-sm text-gray mb-4">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cocoa-dark">About</span>
          </nav>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cocoa-dark mb-4">
            About COCAVYN
          </h1>
          <p className="text-cocoa-light text-lg max-w-2xl">
            Premium chocolate, crafted with passion, delivered with love.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Story Text */}
          <div>
            <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-6">
              A Piece of Sweet Happiness
            </h2>
            <div className="space-y-4 text-cocoa-light leading-relaxed">
              <p>
                COCAVYN was born from a simple belief — that every moment
                deserves a touch of sweetness. Based in Sylhet, Bangladesh, we
                set out to bring premium, world-class chocolate to chocolate
                lovers across the country.
              </p>
              <p>
                Every piece we craft is made with carefully sourced ingredients,
                time-honored techniques, and a genuine love for chocolate. From
                rich dark chocolate to creamy milk chocolate, from elegant gift
                boxes to romantic chocolate bouquets — we offer something for
                every occasion.
              </p>
              <p>
                Whether you are celebrating a birthday, an anniversary, or
                simply treating yourself, COCAVYN is here to make your moment
                a little sweeter.
              </p>
            </div>
          </div>

          {/* Story Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-cocoa via-cocoa-dark to-cocoa shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="text-center px-8">
                <div className="text-9xl mb-4">🍫</div>
                <p className="text-cream font-serif text-3xl font-bold">
                  COCAVYN
                </p>
                <p className="text-cream/70 text-sm mt-2">
                  Crafted with love in Sylhet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-14 md:py-20 border-y border-cocoa/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-gold font-medium text-sm tracking-wider uppercase mb-3">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-cream flex items-center justify-center mb-5 border-2 border-gold/30">
                <span className="text-4xl">🍫</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-3">
                Premium Quality
              </h3>
              <p className="text-cocoa-light leading-relaxed">
                We use only the finest ingredients — pure cocoa, real milk, and
                no artificial additives. Quality is never compromised.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-cream flex items-center justify-center mb-5 border-2 border-gold/30">
                <span className="text-4xl">💝</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-3">
                Made with Love
              </h3>
              <p className="text-cocoa-light leading-relaxed">
                Every chocolate is crafted with genuine care. We believe
                sweetness should come from the heart.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-cream flex items-center justify-center mb-5 border-2 border-gold/30">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-3">
                Fast Delivery
              </h3>
              <p className="text-cocoa-light leading-relaxed">
                From Sylhet to every corner of Bangladesh — we deliver fresh,
                safe, and fast. Cash on Delivery available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-custom py-14 md:py-20">
        <div className="bg-cocoa-dark rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gold mb-4">
            Ready to Taste the Difference?
          </h2>
          <p className="text-cream/80 text-lg mb-8 max-w-xl mx-auto">
            Explore our collection of premium chocolates and find your perfect
            treat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn btn-gold">
              Shop All Chocolate
            </Link>
            <Link
              href="/contact"
              className="btn btn-outline border-cream text-cream hover:bg-cream hover:text-cocoa-dark"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}