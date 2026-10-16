"use client";

import { useState, useRef } from "react";
import { uploadProductImage } from "@/app/admin/actions/upload";

// ============================================
// COCAVYN - Image Upload Component
// ============================================

interface Props {
  initialUrl?: string;
  onUpload?: (url: string) => void;
}

export default function ImageUpload({ initialUrl = "", onUpload }: Props) {
  const [imageUrl, setImageUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadProductImage(formData);

    if (result.error) {
      setError(result.error);
      setUploading(false);
      return;
    }

    setImageUrl(result.url || "");
    onUpload?.(result.url || "");
    setUploading(false);
  };

  const handleRemove = () => {
    setImageUrl("");
    onUpload?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input type="hidden" name="image_url" value={imageUrl} />

      {imageUrl ? (
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden border border-cocoa/10 bg-cream">
            <img
              src={imageUrl}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            title="Remove image"
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`w-full aspect-square rounded-xl border-2 border-dashed border-cocoa/20 hover:border-gold transition-colors flex flex-col items-center justify-center gap-2 bg-cream ${
            uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {uploading ? (
            <>
              <SpinnerIcon />
              <p className="text-sm text-gray">Uploading...</p>
            </>
          ) : (
            <>
              <UploadIcon />
              <p className="text-sm text-cocoa-dark font-medium">
                Upload Image
              </p>
              <p className="text-xs text-gray">PNG, JPG (max 5MB)</p>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}

// ============================================
// Icons
// ============================================

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
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

function SpinnerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin text-cocoa-dark"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}