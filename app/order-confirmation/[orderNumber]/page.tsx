import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Order Confirmation Page
// /order-confirmation/[orderNumber]
// Stage 11.6
// ============================================

interface OrderConfirmationProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationProps) {
  const { orderNumber } = await params;
  const supabase = await createClient();

  // Fetch order by order_number
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
    .eq("order_number", orderNumber)
    .single();

  if (error || !order) {
    notFound();
  }

  // Fetch order items
  const { data: orderItems } = await supabase
    .from("order_items")
    .select("id, product_name, price, quantity, image_emoji, subtotal")
    .eq("order_id", order.id);

  // Payment method display
  const paymentLabels: Record<string, string> = {
    cod: "Cash on Delivery",
    bkash: "bKash",
    nagad: "Nagad",
    card: "Card",
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* Success Header */}
      <div className="bg-cream-dark border-b border-cocoa/10">
        <div className="container-custom py-12 md:py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <CheckIcon />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cocoa-dark mb-4">
            Order Placed! 🎉
          </h1>
          <p className="text-cocoa-light text-lg max-w-xl mx-auto mb-6">
            Thank you for your order. We will contact you shortly to confirm
            your order.
          </p>

          {/* Order Number */}
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-cocoa/10">
            <span className="text-xs text-gray uppercase tracking-wider">
              Order Number
            </span>
            <span className="font-serif font-bold text-cocoa-dark text-lg">
              {order.order_number}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
                Order Items
              </h2>

              <div className="space-y-3">
                {orderItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 py-3 border-b border-cocoa/5 last:border-0"
                  >
                    <div className="w-14 h-14 rounded-lg bg-cream shrink-0 flex items-center justify-center text-2xl">
                      {item.image_emoji || "🍫"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-cocoa-dark">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-cocoa-light">
                        ৳{Number(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-cocoa-dark">
                      ৳{Number(item.subtotal).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
                Delivery Information
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-cocoa-light">Name</span>
                  <span className="font-medium text-cocoa-dark">
                    {order.customer_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa-light">Phone</span>
                  <span className="font-medium text-cocoa-dark">
                    {order.customer_phone}
                  </span>
                </div>
                {order.customer_email && (
                  <div className="flex justify-between">
                    <span className="text-cocoa-light">Email</span>
                    <span className="font-medium text-cocoa-dark">
                      {order.customer_email}
                    </span>
                  </div>
                )}
                <div className="pt-3 border-t border-cocoa/5">
                  <p className="text-cocoa-light mb-1">Shipping Address</p>
                  <p className="text-cocoa-dark">{order.shipping_address}</p>
                </div>
                {order.notes && (
                  <div className="pt-3 border-t border-cocoa/5">
                    <p className="text-cocoa-light mb-1">Note</p>
                    <p className="text-cocoa-dark">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
                Payment Information
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-cocoa-light">Method</span>
                  <span className="font-medium text-cocoa-dark">
                    {paymentLabels[order.payment_method] ||
                      order.payment_method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa-light">Status</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    <span className="font-medium text-cocoa-dark capitalize">
                      {order.payment_status}
                    </span>
                  </span>
                </div>

                {order.payment_method === "bkash" && (
                  <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg text-xs">
                    <p className="font-bold text-cocoa-dark mb-1">
                      bKash Payment Instructions:
                    </p>
                    <p className="text-cocoa-light mb-2">
                      Send ৳{Number(order.total).toLocaleString()} to:
                    </p>
                    <p className="font-mono font-bold text-cocoa-dark">
                      01852134062 (Personal)
                    </p>
                    <p className="text-cocoa-light mt-2">
                      Then contact us with your Transaction ID.
                    </p>
                  </div>
                )}

                {order.payment_method === "nagad" && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-xs">
                    <p className="font-bold text-cocoa-dark mb-1">
                      Nagad Payment Instructions:
                    </p>
                    <p className="text-cocoa-light mb-2">
                      Send ৳{Number(order.total).toLocaleString()} to:
                    </p>
                    <p className="font-mono font-bold text-cocoa-dark">
                      01852134062 (Personal)
                    </p>
                    <p className="text-cocoa-light mt-2">
                      Then contact us with your Transaction ID.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5 sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 py-4 border-b border-cocoa/10">
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Subtotal</span>
                  <span className="font-medium text-cocoa-dark">
                    ৳{Number(order.subtotal).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Delivery</span>
                  <span className="font-medium text-cocoa-dark">
                    ৳{Number(order.delivery_charge)}
                  </span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-cocoa-light">Discount</span>
                    <span className="font-medium text-success">
                      − ৳{Number(order.discount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline py-4">
                <span className="font-serif text-lg font-bold text-cocoa-dark">
                  Total
                </span>
                <span className="font-serif text-3xl font-bold text-cocoa-dark">
                  ৳{Number(order.total).toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-cocoa/10">
                <Link
                  href="/shop"
                  className="btn btn-primary w-full justify-center"
                >
                  Continue Shopping
                </Link>
                <Link
                  href={`/track-order?order=${order.order_number}`}
                  className="block text-center text-sm text-gold hover:text-gold-dark transition-colors"
                >
                  Track Your Order →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="mt-12 bg-cream-dark rounded-2xl p-6 md:p-8 border border-cocoa/5">
          <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-6 text-center">
            What Happens Next?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 border-2 border-gold/30">
                <span className="text-2xl">📞</span>
              </div>
              <p className="font-bold text-cocoa-dark mb-1">Confirmation Call</p>
              <p className="text-sm text-cocoa-light">
                We will call you to confirm your order
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 border-2 border-gold/30">
                <span className="text-2xl">📦</span>
              </div>
              <p className="font-bold text-cocoa-dark mb-1">Packing</p>
              <p className="text-sm text-cocoa-light">
                Your chocolate will be carefully packed
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 border-2 border-gold/30">
                <span className="text-2xl">🚚</span>
              </div>
              <p className="font-bold text-cocoa-dark mb-1">Delivery</p>
              <p className="text-sm text-cocoa-light">
                Delivered within 3 days (outside Sylhet)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Icon
// ============================================

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-success"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}