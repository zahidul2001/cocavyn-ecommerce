"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Create Order Server Action
// Stage 11.5
// Saves order to database
// ============================================

interface OrderItemInput {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  imageEmoji?: string;
}

interface CreateOrderInput {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    division: string;
    district: string;
    upazila: string;
    area: string;
    fullAddress: string;
    landmark: string;
    deliveryNote: string;
  };
  items: OrderItemInput[];
  deliveryZoneId: string;
  deliveryCharge: number;
  paymentMethod: "cod" | "bkash" | "nagad";
  subtotal: number;
  total: number;
}

export async function createOrder(input: CreateOrderInput) {
  try {
    const supabase = await createClient();

    const {
      formData,
      items,
      deliveryZoneId,
      deliveryCharge,
      paymentMethod,
      subtotal,
      total,
    } = input;

    // Validation
    if (!formData.fullName?.trim()) {
      return { error: "Full name is required" };
    }
    if (!formData.phone?.trim()) {
      return { error: "Phone number is required" };
    }
    if (!formData.fullAddress?.trim()) {
      return { error: "Full address is required" };
    }
    if (!items || items.length === 0) {
      return { error: "Cart is empty" };
    }

    // Generate order number
    // Format: CHO-YYYY-XXXXXX (e.g., CHO-2026-000001)
    const year = new Date().getFullYear();

    // Get count of orders for this year
    const { count: orderCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .like("order_number", `CHO-${year}-%`);

    const nextNumber = (orderCount || 0) + 1;
    const orderNumber = `CHO-${year}-${String(nextNumber).padStart(6, "0")}`;

    // Prepare shipping address string
    const shippingAddressParts = [
      formData.fullAddress,
      formData.area,
      formData.upazila,
      formData.district,
      formData.division,
    ].filter(Boolean);

    const shippingAddress = shippingAddressParts.join(", ");

    // Get delivery zone name
    const { data: zone } = await supabase
      .from("delivery_zones")
      .select("name")
      .eq("id", deliveryZoneId)
      .single();

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_number: orderNumber,
          customer_name: formData.fullName.trim(),
          customer_phone: formData.phone.trim(),
          customer_email: formData.email?.trim() || null,
          shipping_name: formData.fullName.trim(),
          shipping_phone: formData.phone.trim(),
          shipping_address: shippingAddress,
          shipping_division: formData.division?.trim() || null,
          shipping_district: formData.district?.trim() || null,
          shipping_upazila: formData.upazila?.trim() || null,
          shipping_area: formData.area?.trim() || null,
          shipping_landmark: formData.landmark?.trim() || null,
          subtotal: subtotal,
          delivery_charge: deliveryCharge,
          discount: 0,
          total: total,
          payment_method: paymentMethod,
          payment_status: "pending",
          order_status: "pending",
          notes: formData.deliveryNote?.trim() || null,
        },
      ])
      .select()
      .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);
      return {
        error: orderError?.message || "Failed to create order",
      };
    }

    // Insert order items
    const orderItemsData = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_slug: item.slug,
      price: item.price,
      quantity: item.quantity,
      image_emoji: item.imageEmoji || null,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsData);

    if (itemsError) {
      console.error("Order items insert error:", itemsError);
      // Cleanup — delete the order we just created
      await supabase.from("orders").delete().eq("id", order.id);
      return { error: itemsError.message };
    }

    // Insert payment record
    const { error: paymentError } = await supabase
      .from("payments")
      .insert([
        {
          order_id: order.id,
          payment_method: paymentMethod,
          amount: total,
          status: "pending",
        },
      ]);

    if (paymentError) {
      console.error("Payment insert error:", paymentError);
      // Not critical — continue
    }

    return {
      success: true,
      orderNumber: order.order_number,
      orderId: order.id,
    };
  } catch (error: any) {
    console.error("Create order error:", error);
    return { error: error.message || "Something went wrong" };
  }
}