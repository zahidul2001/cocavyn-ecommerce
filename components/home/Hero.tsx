import Link from "next/link";

// ============================================
// COCAVYN - Hero Section
// Homepage-এর সবচেয়ে উপরের section
// ============================================

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream-dark to-cream">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right gold circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        {/* Bottom left cocoa circle */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cocoa/10 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative container-custom py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-cocoa/10 text-cocoa px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>Premium Chocolate Shop</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-cocoa-dark mb-6 leading-tight">
              এক টুকরো
              <br />
              <span className="text-gold">মিষ্টি সুখ</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-cocoa-light mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              আপনার প্রিয় মানুষটির জন্য, অথবা নিজের জন্য। Premium quality-এর
              chocolate — ভালোবাসার প্রতিটি মুহূর্তকে আরো মিষ্টি করে তুলুন।
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop" className="btn btn-primary">
                এখনই কিনুন
              </Link>
              <Link href="/shop" className="btn btn-outline">
                সব চকলেট দেখুন
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10 pt-8 border-t border-cocoa/10">
              <div className="flex items-center gap-2 text-sm text-cocoa-light">
                <CheckIcon />
                <span>১০০% Pure Chocolate</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-cocoa-light">
                <CheckIcon />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-cocoa-light">
                <CheckIcon />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right: Image / Placeholder */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Main Image Container */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-cocoa via-cocoa-dark to-cocoa shadow-2xl overflow-hidden flex items-center justify-center relative">
                {/* Placeholder Content */}
                <div className="text-center px-8">
                  <div className="text-9xl mb-4">🍫</div>
                  <p className="text-cream font-serif text-2xl font-bold">
                    COCAVYN
                  </p>
                  <p className="text-cream/70 text-sm mt-2">
                    Chocolate Image আসবে এখানে
                  </p>
                </div>

                {/* Decorative shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20" />
              </div>

              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -top-4 -left-4 bg-cream rounded-2xl shadow-xl px-4 py-3 border border-gold/20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <StarIcon />
                  </div>
                  <div>
                    <p className="font-bold text-cocoa-dark text-sm">4.9 ★</p>
                    <p className="text-xs text-gray">500+ Reviews</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div className="absolute -bottom-4 -right-4 bg-cream rounded-2xl shadow-xl px-4 py-3 border border-gold/20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-cocoa/10 flex items-center justify-center">
                    <TruckIcon />
                  </div>
                  <div>
                    <p className="font-bold text-cocoa-dark text-sm">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-gray">All Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 40L60 45C120 50 240 60 360 60C480 60 600 50 720 45C840 40 960 40 1080 45C1200 50 1320 60 1380 65L1440 70V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z"
            fill="var(--color-cream)"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}

// ============================================
// Icons
// ============================================

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gold"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TruckIcon() {
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
      className="text-cocoa-dark"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}