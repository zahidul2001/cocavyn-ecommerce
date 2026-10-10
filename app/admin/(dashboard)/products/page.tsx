import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Admin Product List
// /admin/products
// Shows all products from database
// ============================================

export default async function AdminProductsPage() {
  const supabase = await createClient();

  // Fetch all products with category info
  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      price,
      previous_price,
      stock,
      rating,
      review_count,
      is_active,
      is_featured,
      is_best_seller,
      created_at,
      categories (
        name
      )
    `
    )
    .order("created_at", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-1">
            Products
          </h1>
          <p className="text-cocoa-light text-sm">
            Manage your chocolate collection
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-cocoa text-cream px-5 py-2.5 rounded-lg font-medium hover:bg-cocoa-dark transition-colors"
        >
          <PlusIcon />
          Add New Product
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <MiniStat
          label="Total"
          value={String(products?.length || 0)}
          color="cocoa"
        />
        <MiniStat
          label="In Stock"
          value={String(
            products?.filter((p) => p.stock > 0 && p.is_active).length || 0
          )}
          color="success"
        />
        <MiniStat
          label="Out of Stock"
          value={String(products?.filter((p) => p.stock === 0).length || 0)}
          color="error"
        />
        <MiniStat
          label="Featured"
          value={String(products?.filter((p) => p.is_featured).length || 0)}
          color="gold"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
          Error loading products: {error.message}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-cocoa/5 overflow-hidden">
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray uppercase tracking-wider border-b border-cocoa/10 bg-cream/50">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <tr
                    key={product.id}
                    className="border-b border-cocoa/5 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-xl shrink-0">
                          🍫
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-cocoa-dark truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray truncate">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-cocoa-light">
                      {product.categories?.name || "—"}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-cocoa-dark">
                          ৳{Number(product.price).toLocaleString()}
                        </p>
                        {product.previous_price && (
                          <p className="text-xs text-gray line-through">
                            ৳{Number(product.previous_price).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          product.stock === 0
                            ? "bg-red-100 text-red-700"
                            : product.stock < 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock === 0
                          ? "Out of Stock"
                          : `${product.stock} in stock`}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {product.is_active ? (
                          <span className="w-2 h-2 rounded-full bg-success" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-gray" />
                        )}
                        <span className="text-xs text-cocoa-light">
                          {product.is_active ? "Active" : "Hidden"}
                        </span>
                      </div>
                      {product.is_featured && (
                        <p className="text-xs text-gold mt-1">⭐ Featured</p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-cream transition-colors"
                          title="View on site"
                        >
                          <EyeIcon />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 rounded-lg hover:bg-cream transition-colors"
                          title="Edit"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                          title="Delete (coming Stage 8)"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="font-serif text-2xl font-bold text-cocoa-dark mb-2">
              No products yet
            </h3>
            <p className="text-cocoa-light text-sm mb-6">
              Start by adding your first chocolate product.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-cocoa text-cream px-5 py-2.5 rounded-lg font-medium hover:bg-cocoa-dark transition-colors"
            >
              <PlusIcon />
              Add First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Mini Stat Component
// ============================================

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "cocoa" | "success" | "error" | "gold";
}) {
  const colorClasses = {
    cocoa: "text-cocoa-dark",
    success: "text-success",
    error: "text-error",
    gold: "text-gold",
  };

  return (
    <div className="bg-white rounded-xl p-3 border border-cocoa/5">
      <p className="text-xs text-gray uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-serif text-xl font-bold ${colorClasses[color]}`}>
        {value}
      </p>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}