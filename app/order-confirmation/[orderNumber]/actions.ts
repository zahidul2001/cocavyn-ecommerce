"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Payment Submission Server Action
// Stage 14.1
// ============================================

interface SubmitPaymentInput {
  orderId: string;
  transactionId: string;
  paymentNumber: string;
}

export async function submitPayment(input: SubmitPaymentInput) {
  try {
    const supabase = await createClient();

    const { orderId, transactionId, paymentNumber } = input;

    // Validation
    if (!orderId?.trim()) {
      return { error: "Order ID is required" };
    }
    if (!transactionId?.trim()) {
      return { error: "Transaction ID is required" };
    }
    if (!paymentNumber?.trim()) {
      return { error: "Payment number is required" };
    }

    // Fetch order to get amount
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, total, payment_method, payment_status, order_number")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return { error: "Order not found" };
    }

    // Check if already paid
    if (order.payment_status === "paid") {
      return { error: "Payment already verified for this order" };
    }

    // Update payment record
    const { error: paymentError } = await supabase
      .from("payments")
      .update({
        transaction_id: transactionId.trim(),
        payment_number: paymentNumber.trim(),
        status: "pending_verification",
      })
      .eq("order_id", orderId);

    if (paymentError) {
      console.error("Payment update error:", paymentError);
      return { error: "Failed to save payment details. Please try again." };
    }

    // Revalidate
    revalidatePath(`/order-confirmation/${order.order_number}`);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);

    return { success: true };
  } catch (error: any) {
    console.error("Payment submit error:", error);
    return { error: error.message || "Something went wrong" };
  }
}