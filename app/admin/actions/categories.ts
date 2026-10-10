"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Category Server Actions
// ============================================

interface CategoryData {
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

// ============================================
// Create New Category
// ============================================

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const categoryData: CategoryData = {
    name: (formData.get("name") as string)?.trim(),
    slug: (formData.get("slug") as string)?.trim(),
    description: (formData.get("description") as string)?.trim() || "",
    display_order: parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "on",
  };

  // Validation
  if (!categoryData.name) {
    return { error: "Category name is required" };
  }
  if (!categoryData.slug) {
    return { error: "Category slug is required" };
  }

  // Insert
  const { error } = await supabase.from("categories").insert([categoryData]);

  if (error) {
    if (error.code === "23505") {
      return { error: "A category with this slug already exists" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
  redirect("/admin/categories");
}

// ============================================
// Update Category
// ============================================

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const categoryData: CategoryData = {
    name: (formData.get("name") as string)?.trim(),
    slug: (formData.get("slug") as string)?.trim(),
    description: (formData.get("description") as string)?.trim() || "",
    display_order: parseInt(formData.get("display_order") as string) || 0,
    is_active: formData.get("is_active") === "on",
  };

  if (!categoryData.name) {
    return { error: "Category name is required" };
  }
  if (!categoryData.slug) {
    return { error: "Category slug is required" };
  }

  const { error } = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: "A category with this slug already exists" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
  redirect("/admin/categories");
}

// ============================================
// Delete Category
// ============================================

export async function deleteCategory(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Check if category has products
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if (count && count > 0) {
    return {
      error: `Cannot delete — this category has ${count} product(s). Please move or delete them first.`,
    };
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
  return { success: true };
}