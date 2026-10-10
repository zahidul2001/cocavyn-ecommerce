import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

// ============================================
// COCAVYN - Category List
// /admin/categories
// ============================================

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  // Fetch categories with product count
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, display_order, is_active, created_at")
    .order("display_order", { ascending: true });

  // Get product counts for each category
  const { data: productCounts } = await supabase
    .from("products")
    .select("category_id");

  const getProductCount = (categoryId: string) => {
    return (
      productCounts?.filter((p) => p.category_id === categoryId).length || 0
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-1">
            Categories
          </h1>
          <p className="text-cocoa-light text-sm">
            Organize your products into categories
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-cocoa text-cream px-5 py-2.5 rounded-lg font-medium hover:bg-cocoa-dark transition-colors"
        >
          <PlusIcon />
          Add New Category
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
          Error loading categories: {error.message}
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-cocoa/5 overflow-hidden">
        {categories && categories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray uppercase tracking-wider border-b border-cocoa/10 bg-cream/50">
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Products</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const productCount = getProductCount(category.id);

                  return (
                    <tr
                      key={category.id}
                      className="border-b border-cocoa/5 last:border-0 hover:bg-cream/30 transition-colors"
                    >
                      {/* Name */}
                      <td className="px-4 py-3">
                        <p className="font-medium text-cocoa-dark">
                          {category.name}
                        </p>
                        {category.description && (
                          <p className="text-xs text-gray truncate max-w-xs">
                            {category.description}
                          </p>
                        )}
                      </td>

                      {/* Slug */}
                      <td className="px-4 py-3 text-cocoa-light font-mono text-xs">
                        {category.slug}
                      </td>

                      {/* Products count */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-cream text-cocoa-dark">
                          {productCount} product
                          {productCount !== 1 ? "s" : ""}
                        </span>
                      </td>

                      {/* Order */}
                      <td className="px-4 py-3 text-cocoa-light">
                        {category.display_order}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {category.is_active ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-success" />
                              <span className="text-xs text-cocoa-light">
                                Active
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-gray" />
                              <span className="text-xs text-cocoa-light">
                                Hidden
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/categories/${category.id}/edit`}
                            className="p-2 rounded-lg hover:bg-cream transition-colors"
                            title="Edit"
                          >
                            <EditIcon />
                          </Link>
                          <DeleteCategoryButton
                            id={category.id}
                            name={category.name}
                            productCount={productCount}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="font-serif text-2xl font-bold text-cocoa-dark mb-2">
              No categories yet
            </h3>
            <p className="text-cocoa-light text-sm mb-6">
              Create your first category to organize products.
            </p>
            <Link
              href="/admin/categories/new"
              className="inline-flex items-center gap-2 bg-cocoa text-cream px-5 py-2.5 rounded-lg font-medium hover:bg-cocoa-dark transition-colors"
            >
              <PlusIcon />
              Add First Category
            </Link>
          </div>
        )}
      </div>
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