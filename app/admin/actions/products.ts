"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Product Server Actions
// ============================================

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  previous_price: number | null;
  stock: number;
  sku: string;
  category_id: string | null;
  image_url: string;
  is_featured: boolean;
  is_best_seller: boolean;
  is_active: boolean;
}

// ============================================
// Create New Product
// ============================================

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const productData: ProductFormData = {
    name: (formData.get("name") as string)?.trim(),
    slug: (formData.get("slug") as string)?.trim(),
    description: (formData.get("description") as string)?.trim() || "",
    short_description:
      (formData.get("short_description") as string)?.trim() || "",
    price: parseFloat(formData.get("price") as string) || 0,
    previous_price: formData.get("previous_price")
      ? parseFloat(formData.get("previous_price") as string)
      : null,
    stock: parseInt(formData.get("stock") as string) || 0,
    sku: (formData.get("sku") as string)?.trim() || "",
    category_id: (formData.get("category_id") as string) || null,
    image_url: (formData.get("image_url") as string)?.trim() || "",
    is_featured: formData.get("is_featured") === "on",
    is_best_seller: formData.get("is_best_seller") === "on",
    is_active: formData.get("is_active") === "on",
  };

  if (!productData.name) {
    return { error: "Product name is required" };
  }
  if (!productData.slug) {
    return { error: "Product slug is required" };
  }
  if (productData.price <= 0) {
    return { error: "Price must be greater than 0" };
  }

  const { error } = await supabase.from("products").insert([productData]);

  if (error) {
    if (error.code === "23505") {
      return { error: "A product with this slug already exists" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");

  redirect("/admin/products");
}

// ============================================
// Update Existing Product
// ============================================

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const productData: ProductFormData = {
    name: (formData.get("name") as string)?.trim(),
    slug: (formData.get("slug") as string)?.trim(),
    description: (formData.get("description") as string)?.trim() || "",
    short_description:
      (formData.get("short_description") as string)?.trim() || "",
    price: parseFloat(formData.get("price") as string) || 0,
    previous_price: formData.get("previous_price")
      ? parseFloat(formData.get("previous_price") as string)
      : null,
    stock: parseInt(formData.get("stock") as string) || 0,
    sku: (formData.get("sku") as string)?.trim() || "",
    category_id: (formData.get("category_id") as string) || null,
    image_url: (formData.get("image_url") as string)?.trim() || "",
    is_featured: formData.get("is_featured") === "on",
    is_best_seller: formData.get("is_best_seller") === "on",
    is_active: formData.get("is_active") === "on",
  };

  if (!productData.name) {
    return { error: "Product name is required" };
  }
  if (!productData.slug) {
    return { error: "Product slug is required" };
  }
  if (productData.price <= 0) {
    return { error: "Price must be greater than 0" };
  }

  const { error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "A product with this slug already exists" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath(`/products/${productData.slug}`);

  redirect("/admin/products");
}

// ============================================
// Delete Product
// ============================================

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if product has orders
  const { count } = await supabase
    .from("order_items")
    .select("*", { count: "exact", head: true })
    .eq("product_id", id);

  if (count && count > 0) {
    return {
      error: `Cannot delete — this product appears in ${count} order(s). Please keep the product instead of deleting it.`,
    };
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");

  return { success: true };
}