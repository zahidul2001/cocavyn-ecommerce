"use client";

import { useState } from "react";
import { createCategory } from "@/app/admin/actions/categories";

// ============================================
// COCAVYN - Category Form
// Used for Add + Edit
// ============================================

interface CategoryFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    display_order: number;
    is_active: boolean;
  };
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  const handleNameChange = (value: string) => {
    setName(value);
    if (!initialData) {
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
      const result = await createCategory(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
              Category Information
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Category Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g., Vegan Chocolate"
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
                  placeholder="vegan-chocolate"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray font-mono text-sm"
                  disabled={loading}
                />
                <p className="text-xs text-gray mt-1">
                  URL: /shop?category={slug || "your-category-slug"}
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={initialData?.description || ""}
                  placeholder="Brief description of this category"
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray resize-none"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h3 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
              Display Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="display_order"
                  className="block text-sm font-medium text-cocoa-dark mb-2"
                >
                  Display Order
                </label>
                <input
                  id="display_order"
                  name="display_order"
                  type="number"
                  min="0"
                  defaultValue={initialData?.display_order || 0}
                  className="w-full px-4 py-2.5 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark"
                  disabled={loading}
                />
                <p className="text-xs text-gray mt-1">
                  Lower numbers appear first
                </p>
              </div>

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
            </div>
          </div>

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
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}