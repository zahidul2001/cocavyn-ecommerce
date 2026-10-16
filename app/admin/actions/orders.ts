"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Order Server Actions
// Stage 12.3
// ============================================

// ============================================
// Update Order Status
// ============================================

export async function updateOrderStatus(
  orderId: string,
  newStatus: string
) {
  const supabase = await createClient();

  // Verify user is logged in (admin)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Validate status
  const validStatuses = [
    "pending",
    "confirmed",
    "processing",
    "packed",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  if (!validStatuses.includes(newStatus)) {
    return { error: "Invalid status" };
  }

  // Update order status
  const { error } = await supabase
    .from("orders")
    .update({ order_status: newStatus })
    .eq("id", orderId);

  if (error) {
    return { error: error.message };
  }

  // Revalidate pages
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");

  return { success: true };
}

// ============================================
// Verify Payment
// ============================================

export async function verifyPayment(
  orderId: string,
  transactionId: string,
  paymentNumber: string
) {
  const supabase = await createClient();

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  if (!transactionId?.trim()) {
    return { error: "Transaction ID is required" };
  }

  // Update payment record
  const { error: paymentError } = await supabase
    .from("payments")
    .update({
      transaction_id: transactionId.trim(),
      payment_number: paymentNumber?.trim() || null,
      status: "verified",
      verified_by: user.email || null,
      verified_at: new Date().toISOString(),
    })
    .eq("order_id", orderId);

  if (paymentError) {
    return { error: paymentError.message };
  }

  // Update order: payment_status = paid, order_status = confirmed
  const { error: orderError } = await supabase
    .from("orders")
    .update({
      payment_status: "paid",
      order_status: "confirmed",
    })
    .eq("id", orderId);

  if (orderError) {
    return { error: orderError.message };
  }

  // Revalidate
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");

  return { success: true };
}