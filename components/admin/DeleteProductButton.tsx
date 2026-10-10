"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/admin/actions/products";

// ============================================
// COCAVYN - Delete Product Button
// With confirmation modal
// ============================================

interface Props {
  id: string;
  name: string;
}

export default function DeleteProductButton({ id, name }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    const result = await deleteProduct(id);

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
        title="Delete product"
      >
        <TrashIcon />
      </button>
    );
  }

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-cocoa-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => !loading && setConfirming(false)}
      >
        <div
          className="bg-white rounded-2xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <TrashIcon className="text-red-600" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-1">
                Delete Product?
              </h3>
              <p className="text-cocoa-light text-sm">
                Are you sure you want to delete <strong>"{name}"</strong>?
                This action cannot be undone.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => {
                setConfirming(false);
                setError("");
              }}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-cream text-cocoa-dark hover:bg-cream-dark transition-colors text-sm font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                loading
                  ? "bg-gray-light text-gray cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {loading ? "Deleting..." : "Delete Product"}
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

function TrashIcon({ className = "" }: { className?: string }) {
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
      className={className}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
