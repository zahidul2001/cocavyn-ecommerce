"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/admin/actions/categories";

// ============================================
// COCAVYN - Delete Category Button
// ============================================

interface Props {
  id: string;
  name: string;
  productCount: number;
}

export default function DeleteCategoryButton({
  id,
  name,
  productCount,
}: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    const result = await deleteCategory(id);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setConfirming(false);
    setLoading(false);
    router.refresh();
  };

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
        title="Delete"
      >
        <TrashIcon />
      </button>
    );
  }

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-cocoa-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-2">
            Delete Category?
          </h3>
          <p className="text-cocoa-light text-sm mb-4">
            Are you sure you want to delete <strong>"{name}"</strong>? This
            action cannot be undone.
          </p>

          {productCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-3 rounded-lg mb-4">
              ⚠️ This category has {productCount} product
              {productCount !== 1 ? "s" : ""}. You must move or delete them
              first.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setConfirming(false);
                setError("");
              }}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-cream text-cocoa-dark hover:bg-cream-dark transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading || productCount > 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                loading || productCount > 0
                  ? "bg-gray-light text-gray cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// Icon
// ============================================

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