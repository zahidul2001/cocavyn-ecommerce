import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

// ============================================
// COCAVYN - Add New Product
// /admin/products/new
// ============================================

export default async function NewProductPage() {
  const supabase = await createClient();

  // Fetch categories for dropdown
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("display_order");

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-sm text-gold hover:text-gold-dark transition-colors mb-2 inline-flex items-center gap-1"
        >
          <ArrowLeftIcon />
          Back to Products
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mt-2">
          Add New Product
        </h1>
        <p className="text-cocoa-light text-sm mt-1">
          Create a new chocolate product for your store
        </p>
      </div>

      {/* Form */}
      <ProductForm categories={categories || []} />
    </div>
  );
}

// ============================================
// Icon
// ============================================

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}