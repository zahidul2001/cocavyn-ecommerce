"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Order Lookup Server Action
// Stage 13.2
// ============================================

interface TrackOrderInput {
  orderNumber: string;
  phone: string;
}

export async function lookupOrder(input: TrackOrderInput) {
  try {
    const supabase = await createClient();

    const { orderNumber, phone } = input;

    // Validation
    if (!orderNumber?.trim()) {
      return { error: "Order number is required" };
    }
    if (!phone?.trim()) {
      return { error: "Phone number is required" };
    }

    // Lookup order by number AND phone (for security)
    const { data: order, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        order_number,
        customer_name,
        customer_phone,
        customer_email,
        shipping_address,
        shipping_division,
        shipping_district,
        shipping_upazila,
        shipping_area,
        shipping_landmark,
        subtotal,
        delivery_charge,
        discount,
        total,
        payment_method,
        payment_status,
        order_status,
        notes,
        created_at
      `
      )
      .eq("order_number", orderNumber.trim().toUpperCase())
      .eq("customer_phone", phone.trim())
      .maybeSingle();

    if (error) {
      console.error("Order lookup error:", error);
      return { error: "Unable to lookup order. Please try again." };
    }

    if (!order) {
      return {
        error:
          "Order not found. Please check your order number and phone number.",
      };
    }

    // Fetch order items
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);

    return {
      success: true,
      order: order,
      items: items || [],
    };
  } catch (error: any) {
    console.error("Lookup error:", error);
    return {
      error: error.message || "Something went wrong. Please try again.",
    };
  }
}