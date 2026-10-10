import Link from "next/link";
import CategoryForm from "@/components/admin/CategoryForm";

// ============================================
// COCAVYN - Add New Category
// /admin/categories/new
// ============================================

export default function NewCategoryPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="text-sm text-gold hover:text-gold-dark transition-colors mb-2 inline-flex items-center gap-1"
        >
          <ArrowLeftIcon />
          Back to Categories
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mt-2">
          Add New Category
        </h1>
        <p className="text-cocoa-light text-sm mt-1">
          Create a new category to organize your products
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}

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