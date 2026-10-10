"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/app/admin/actions/products";

// ============================================
// COCAVYN - Product Form
// Used for both Create and Edit
// ============================================

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  categories: Category[];
  initialData?: any;
  isEditMode?: boolean;
}

export default function ProductForm({
  categories,
  initialData,
  isEditMode = false,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  const handleNameChange = (value: string) => {
    setName(value);
    // Auto-generate slug ONLY in create mode
    if (!isEditMode) {
      const autoSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(autoSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      let result;

      if (isEditMode && initialData?.id) {
        result = await updateProduct(initialData.id, formData);
      } else {
        result = await createProduct(formData);
      }

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
      // If no error → redirect happens automatically
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Product Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Premium Dark Chocolate"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                  disabled={loading}
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  URL Slug *
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="premium-dark-chocolate"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray font-mono text-sm"
                  disabled={loading}
                />
                <p className="text-xs text-gray mt-1">
                  URL: /products/{slug || "your-product-slug"}
                </p>
              </div>

              {/* Short Description */}
              <div>
                <label
                  htmlFor="short_description"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Short Description
                </label>
                <input
                  id="short_description"
                  name="short_description"
                  type="text"
                  defaultValue={initialData?.short_description || ""}
                  placeholder="Brief description (shown on cards)"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Full Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  defaultValue={initialData?.description || ""}
                  placeholder="Detailed description of the product"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray resize-none"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
              Pricing & Stock
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Price (৳) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  defaultValue={initialData?.price || ""}
                  placeholder="500"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="previous_price"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Previous Price (৳)
                </label>
                <input
                  id="previous_price"
                  name="previous_price"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={initialData?.previous_price || ""}
                  placeholder="650 (optional)"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  required
                  defaultValue={initialData?.stock ?? 0}
                  placeholder="25"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  SKU
                </label>
                <input
                  id="sku"
                  name="sku"
                  type="text"
                  defaultValue={initialData?.sku || ""}
                  placeholder="CHO-DK-001"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray font-mono text-sm"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Category */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
              Category
            </h3>
            <select
              name="category_id"
              defaultValue={initialData?.category_id || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark"
              disabled={loading}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Flags */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
              Display Options
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={
                    initialData ? initialData.is_active : true
                  }
                  className="w-4 h-4 accent-cocoa"
                  disabled={loading}
                />
                <span className="text-sm text-cocoa-dark">Active</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={initialData?.is_featured || false}
                  className="w-4 h-4 accent-cocoa"
                  disabled={loading}
                />
                <span className="text-sm text-cocoa-dark">
                  Featured on homepage
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_best_seller"
                  defaultChecked={initialData?.is_best_seller || false}
                  className="w-4 h-4 accent-cocoa"
                  disabled={loading}
                />
                <span className="text-sm text-cocoa-dark">
                  Mark as Best Seller
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                loading
                  ? "bg-gray-light text-gray cursor-not-allowed"
                  : "bg-cocoa text-cream hover:bg-cocoa-dark"
              }`}
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Product"
                : "Save Product"}
            </button>
            <p className="text-xs text-gray text-center mt-3">
              {isEditMode
                ? "Changes will be saved to database"
                : "Product will be saved to database"}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}