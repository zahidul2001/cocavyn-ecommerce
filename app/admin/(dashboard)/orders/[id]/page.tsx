import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OrderActions from "@/components/admin/OrderActions";

// ============================================
// COCAVYN - Admin Order Details
// /admin/orders/[id]
// Stage 12.3 — With Order Actions
// ============================================

interface OrderDetailsProps {
  params: Promise<{ id: string }>;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  packed: "bg-indigo-100 text-indigo-800",
  shipped: "bg-cyan-100 text-cyan-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  card: "Card",
};

const ORDER_FLOW = [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
];

export default async function AdminOrderDetailsPage({
  params,
}: OrderDetailsProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch order
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !order) {
    notFound();
  }

  // Fetch order items
  const { data: items } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order.id);

  // Fetch payment
  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .eq("order_id", order.id)
    .maybeSingle();

  const currentStatusIndex = ORDER_FLOW.indexOf(order.order_status);
  const isCancelled = order.order_status === "cancelled";

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/orders"
          className="text-sm text-gold hover:text-gold-dark transition-colors mb-2 inline-flex items-center gap-1"
        >
          <ArrowLeftIcon />
          Back to Orders
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-1">
              Order {order.order_number}
            </h1>
            <p className="text-cocoa-light text-sm">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                STATUS_STYLES[order.order_status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {order.order_status.replace(/_/g, " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      {!isCancelled && (
        <div className="bg-white rounded-2xl p-6 border border-cocoa/5 mb-6">
          <h2 className="font-serif text-lg font-bold text-cocoa-dark mb-5">
            Order Progress
          </h2>

          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {ORDER_FLOW.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={status} className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? "bg-success text-white"
                          : "bg-cream text-gray"
                      } ${isCurrent ? "ring-4 ring-success/20" : ""}`}
                    >
                      {isCompleted ? <CheckSmallIcon /> : index + 1}
                    </div>
                    <span
                      className={`text-xs text-center whitespace-nowrap ${
                        isCompleted
                          ? "text-cocoa-dark font-medium"
                          : "text-gray"
                      }`}
                    >
                      {status.replace(/_/g, " ")}
                    </span>
                  </div>

                  {index < ORDER_FLOW.length - 1 && (
                    <div
                      className={`w-6 md:w-12 h-0.5 -mt-5 ${
                        index < currentStatusIndex ? "bg-success" : "bg-cream"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <p className="font-bold text-red-700 mb-1">
            ❌ This Order is Cancelled
          </p>
          <p className="text-sm text-red-600">
            No further action can be taken on this order.
          </p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h2 className="font-serif text-xl font-bold text-cocoa-dark mb-4">
              Order Items
            </h2>

            <div className="space-y-3">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-3 border-b border-cocoa/5 last:border-0"
                >
                  <div className="w-16 h-16 rounded-lg bg-cream flex items-center justify-center text-3xl shrink-0">
                    {item.image_emoji || "🍫"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product_slug}`}
                      target="_blank"
                      className="font-medium text-cocoa-dark hover:text-gold transition-colors"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-xs text-gray mt-1">
                      ৳{Number(item.price).toLocaleString()} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-serif font-bold text-cocoa-dark">
                    ৳{Number(item.subtotal).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="mt-6 pt-6 border-t-2 border-cocoa/10 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-cocoa-light">Subtotal</span>
                <span className="font-medium text-cocoa-dark">
                  ৳{Number(order.subtotal).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cocoa-light">Delivery Charge</span>
                <span className="font-medium text-cocoa-dark">
                  ৳{Number(order.delivery_charge).toLocaleString()}
                </span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-cocoa-light">Discount</span>
                  <span className="font-medium text-success">
                    − ৳{Number(order.discount).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-3 border-t border-cocoa/10">
                <span className="font-serif text-lg font-bold text-cocoa-dark">
                  Total
                </span>
                <span className="font-serif text-2xl font-bold text-cocoa-dark">
                  ৳{Number(order.total).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                Customer Information
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray uppercase tracking-wider mb-1">
                    Name
                  </p>
                  <p className="font-medium text-cocoa-dark">
                    {order.customer_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${order.customer_phone}`}
                    className="font-medium text-cocoa-dark hover:text-gold"
                  >
                    {order.customer_phone}
                  </a>
                </div>
                {order.customer_email && (
                  <div>
                    <p className="text-xs text-gray uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${order.customer_email}`}
                      className="font-medium text-cocoa-dark hover:text-gold break-all"
                    >
                      {order.customer_email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
              <h2 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
                Shipping Address
              </h2>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-cocoa-dark">
                  {order.shipping_name}
                </p>
                <p className="text-cocoa-light">{order.shipping_phone}</p>
                <p className="text-cocoa-light leading-relaxed">
                  {order.shipping_address}
                </p>
                {order.shipping_landmark && (
                  <p className="text-xs text-gray">
                    📍 {order.shipping_landmark}
                  </p>
                )}
                {order.notes && (
                  <div className="pt-3 border-t border-cocoa/5 mt-3">
                    <p className="text-xs text-gray uppercase tracking-wider mb-1">
                      Delivery Note
                    </p>
                    <p className="text-cocoa-light italic">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Payment Info */}
          <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
            <h2 className="font-serif text-lg font-bold text-cocoa-dark mb-4">
              Payment Information
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-gray uppercase tracking-wider mb-1">
                  Method
                </p>
                <p className="font-medium text-cocoa-dark">
                  {PAYMENT_METHOD_LABELS[order.payment_method] ||
                    order.payment_method}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray uppercase tracking-wider mb-1">
                  Status
                </p>
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                    order.payment_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : order.payment_status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray uppercase tracking-wider mb-1">
                  Amount
                </p>
                <p className="font-serif text-xl font-bold text-cocoa-dark">
                  ৳{Number(order.total).toLocaleString()}
                </p>
              </div>

              {payment?.transaction_id && (
                <div>
                  <p className="text-xs text-gray uppercase tracking-wider mb-1">
                    Transaction ID
                  </p>
                  <p className="font-mono text-xs text-cocoa-dark break-all">
                    {payment.transaction_id}
                  </p>
                </div>
              )}

              {payment?.payment_number && (
                <div>
                  <p className="text-xs text-gray uppercase tracking-wider mb-1">
                    Payment Number
                  </p>
                  <p className="font-mono text-xs text-cocoa-dark">
                    {payment.payment_number}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Actions */}
          <OrderActions
            orderId={order.id}
            currentStatus={order.order_status}
            paymentMethod={order.payment_method}
            paymentStatus={order.payment_status}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}