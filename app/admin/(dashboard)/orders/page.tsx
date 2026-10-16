import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Admin Orders List
// /admin/orders
// Shows all orders from database
// Stage 12.1
// ============================================

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

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

const PAYMENT_STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Fetch all orders with items count
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      order_number,
      customer_name,
      customer_phone,
      total,
      payment_method,
      payment_status,
      order_status,
      created_at
    `
    )
    .order("created_at", { ascending: false });

  // Get item counts per order
  const { data: orderItems } = await supabase
    .from("order_items")
    .select("order_id");

  const getItemCount = (orderId: string) => {
    return orderItems?.filter((i) => i.order_id === orderId).length || 0;
  };

  // Stats
  const totalOrders = orders?.length || 0;
  const pendingOrders =
    orders?.filter((o) => o.order_status === "pending").length || 0;
  const deliveredOrders =
    orders?.filter((o) => o.order_status === "delivered").length || 0;
  const totalRevenue =
    orders
      ?.filter((o) => o.order_status !== "cancelled")
      .reduce((sum, o) => sum + Number(o.total), 0) || 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-1">
          Orders
        </h1>
        <p className="text-cocoa-light text-sm">
          Manage customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatBox
          label="Total Orders"
          value={String(totalOrders)}
          color="cocoa"
        />
        <StatBox
          label="Pending"
          value={String(pendingOrders)}
          color="warning"
        />
        <StatBox
          label="Delivered"
          value={String(deliveredOrders)}
          color="success"
        />
        <StatBox
          label="Revenue"
          value={`৳${totalRevenue.toLocaleString()}`}
          color="gold"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
          Error loading orders: {error.message}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-cocoa/5 overflow-hidden">
        {orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray uppercase tracking-wider border-b border-cocoa/10 bg-cream/50">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-cocoa/5 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    {/* Order Number */}
                    <td className="px-4 py-3">
                      <p className="font-mono font-medium text-cocoa-dark text-xs">
                        {order.order_number}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-cocoa-dark">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-gray">
                        {order.customer_phone}
                      </p>
                    </td>

                    {/* Items */}
                    <td className="px-4 py-3 text-cocoa-light">
                      {getItemCount(order.id)} item
                      {getItemCount(order.id) !== 1 ? "s" : ""}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3">
                      <p className="font-serif font-bold text-cocoa-dark">
                        ৳{Number(order.total).toLocaleString()}
                      </p>
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase text-cocoa-light">
                          {order.payment_method}
                        </span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block w-fit ${
                            PAYMENT_STATUS_STYLES[order.payment_status] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.payment_status}
                        </span>
                      </div>
                    </td>

                    {/* Order Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          STATUS_STYLES[order.order_status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.order_status.replace(/_/g, " ")}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-xs text-gray">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:text-gold-dark transition-colors"
                      >
                        View
                        <ArrowRightIcon />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="font-serif text-2xl font-bold text-cocoa-dark mb-2">
              No orders yet
            </h3>
            <p className="text-cocoa-light text-sm">
              Customer orders will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Stat Box Component
// ============================================

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "cocoa" | "warning" | "success" | "gold";
}) {
  const colorClasses = {
    cocoa: "text-cocoa-dark",
    warning: "text-warning",
    success: "text-success",
    gold: "text-gold",
  };

  return (
    <div className="bg-white rounded-xl p-3 border border-cocoa/5">
      <p className="text-xs text-gray uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-serif text-xl font-bold ${colorClasses[color]}`}>
        {value}
      </p>
    </div>
  );
}

// ============================================
// Icons
// ============================================

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}