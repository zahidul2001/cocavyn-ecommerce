"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Image Upload Server Action
// Uploads image to Supabase Storage
// Returns public URL
// ============================================

export async function uploadProductImage(formData: FormData) {
  const supabase = await createClient();

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Get file from FormData
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "No file provided" };
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return { error: "File must be an image" };
  }

  // Validate file size (5 MB max)
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  if (file.size > MAX_SIZE) {
    return { error: "File size must be less than 5 MB" };
  }

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  // Upload to Supabase Storage
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return { error: uploadError.message };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return { url: publicUrl };
}