export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Temporary test section - we'll build the real homepage in Stage 4.7 */}
      <section className="container-custom py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-cocoa-dark mb-6">
          COCAVYN
        </h1>
        <p className="text-xl md:text-2xl text-cocoa-light mb-8">
          এক টুকরো মিষ্টি সুখ 🍫
        </p>
        <p className="text-lg text-gray mb-10 max-w-2xl mx-auto">
          Premium chocolate for chocolate lovers. Bangladesh-এর সেরা
          chocolate shop — শীঘ্রই আসছে।
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary">
            এখনই কিনুন
          </button>
          <button className="btn btn-outline">
            সব চকলেট দেখুন
          </button>
        </div>
      </section>
    </main>
  );
}