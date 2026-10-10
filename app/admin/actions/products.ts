"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Product Server Actions
// Server-side functions to manage products
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
  is_featured: boolean;
  is_best_seller: boolean;
  is_active: boolean;
}

// ============================================
// Create New Product
// ============================================

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
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
    is_featured: formData.get("is_featured") === "on",
    is_best_seller: formData.get("is_best_seller") === "on",
    is_active: formData.get("is_active") === "on",
  };

  // Validation
  if (!productData.name) {
    return { error: "Product name is required" };
  }
  if (!productData.slug) {
    return { error: "Product slug is required" };
  }
  if (productData.price <= 0) {
    return { error: "Price must be greater than 0" };
  }

  // Insert into database
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select()
    .single();

  if (error) {
    // Check for duplicate slug
    if (error.code === "23505") {
      return { error: "A product with this slug already exists" };
    }
    return { error: error.message };
  }

  // Revalidate the products list page (fresh data)
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");

  // Redirect to products list
  redirect("/admin/products");
}

// ============================================
// Update Existing Product
// ============================================

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Extract form data
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
    is_featured: formData.get("is_featured") === "on",
    is_best_seller: formData.get("is_best_seller") === "on",
    is_active: formData.get("is_active") === "on",
  };

  // Validation
  if (!productData.name) {
    return { error: "Product name is required" };
  }
  if (!productData.slug) {
    return { error: "Product slug is required" };
  }
  if (productData.price <= 0) {
    return { error: "Price must be greater than 0" };
  }

  // Update in database
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

  // Revalidate
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath(`/products/${productData.slug}`);

  // Redirect to products list
  redirect("/admin/products");
}

// ============================================
// Delete Product
// ============================================

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if product has orders (foreign key check)
  const { count } = await supabase
    .from("order_items")
    .select("*", { count: "exact", head: true })
    .eq("product_id", id);

  if (count && count > 0) {
    return {
      error: `Cannot delete — this product appears in ${count} order(s). Please keep the product instead of deleting it.`,
    };
  }

  // Delete product
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  // Revalidate
  revalidatePath("/admin/products");
  revalidatePath("/admin");
  revalidatePath("/shop");

  return { success: true };
}