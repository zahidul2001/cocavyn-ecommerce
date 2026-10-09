import { supabase } from "@/lib/supabase/client";

// ============================================
// COCAVYN - Database Connection Test Page
// This page will be DELETED after testing
// ============================================

export default async function TestPage() {
  // Fetch products from Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true);

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-cocoa-dark mb-6">
          Database Connection Test
        </h1>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">❌ Error:</p>
            <p>{error.message}</p>
            <p className="text-sm mt-2">Code: {error.code}</p>
          </div>
        )}

        {/* Success Display */}
        {!error && products && (
          <>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-bold">✅ Connection Successful!</p>
              <p>
                Found <strong>{products.length}</strong> products in the
                database.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-4">
              Products from Database:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-5 border border-cocoa/10"
                >
                  <p className="text-xs text-gray uppercase tracking-wider mb-1">
                    {product.slug}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="text-cocoa-light text-sm mb-3 line-clamp-2">
                    {product.short_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-cocoa-dark">
                      ৳{product.price}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Data Display */}
        {!error && products && products.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="font-bold">⚠️ No products found.</p>
            <p>Database connected but products table is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}