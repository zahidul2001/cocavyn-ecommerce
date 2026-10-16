import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Admin Dashboard
// /admin
// Stage 12.4 — Real order stats
// ============================================

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

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch stats in parallel
  const [
    { count: productCount },
    { count: orderCount },
    { count: customerCount },
    { data: ordersData },
    { data: recentOrders },
    { count: pendingOrders },
    { count: deliveredOrders },
    { count: cancelledOrders },
  ] = await Promise.all([
    // Total active products
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),

    // Total orders
    supabase.from("orders").select("*", { count: "exact", head: true }),

    // Total customers
    supabase.from("customers").select("*", { count: "exact", head: true }),

    // All orders totals (for sales sum — excluding cancelled)
    supabase
      .from("orders")
      .select("total, order_status")
      .neq("order_status", "cancelled"),

    // Recent 5 orders
    supabase
      .from("orders")
      .select(
        "id, order_number, customer_name, total, order_status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(5),

    // Pending orders
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("order_status", "pending"),

    // Delivered orders
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("order_status", "delivered"),

    // Cancelled orders
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("order_status", "cancelled"),
  ]);

  // Calculate total sales (excluding cancelled)
  const totalSales =
    ordersData?.reduce((sum, order) => sum + Number(order.total || 0), 0) || 0;

  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-2">
        Welcome back! 👋
      </h1>
      <p className="text-cocoa-light mb-8">
        Here is what is happening with your store today.
      </p>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Sales"
          value={`৳${totalSales.toLocaleString()}`}
          icon="💰"
          accent="gold"
        />
        <StatCard
          label="Total Orders"
          value={String(orderCount || 0)}
          icon="📦"
          accent="cocoa"
        />
        <StatCard
          label="Products"
          value={String(productCount || 0)}
          icon="🍫"
          accent="rose"
        />
        <StatCard
          label="Customers"
          value={String(customerCount || 0)}
          icon="👥"
          accent="success"
        />
      </div>

      {/* Order Status Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="bg-white rounded-2xl p-5 border border-cocoa/5 hover:border-gold/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray uppercase tracking-wider mb-1">
                Pending Orders
              </p>
              <p className="font-serif text-3xl font-bold text-warning">
                {pendingOrders || 0}
              </p>
            </div>
            <span className="text-4xl">⏳</span>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white rounded-2xl p-5 border border-cocoa/5 hover:border-gold/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray uppercase tracking-wider mb-1">
                Delivered
              </p>
              <p className="font-serif text-3xl font-bold text-success">
                {deliveredOrders || 0}
              </p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </Link>

        <Link
          href="/admin/orders"
          className="bg-white rounded-2xl p-5 border border-cocoa/5 hover:border-gold/40 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray uppercase tracking-wider mb-1">
                Cancelled
              </p>
              <p className="font-serif text-3xl font-bold text-error">
                {cancelledOrders || 0}
              </p>
            </div>
            <span className="text-4xl">❌</span>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <QuickAction
          href="/admin/products/new"
          label="Add Product"
          icon="➕"
        />
        <QuickAction
          href="/admin/categories/new"
          label="Add Category"
          icon="📁"
        />
        <QuickAction href="/admin/orders" label="View Orders" icon="📋" />
        <QuickAction href="/" label="View Website" icon="🌐" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-bold text-cocoa-dark">
            Recent Orders
          </h3>
          <Link
            href="/admin/orders"
            className="text-sm text-gold hover:text-gold-dark transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray uppercase tracking-wider border-b border-cocoa/10">
                  <th className="py-2">Order</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-cocoa/5 last:border-0 hover:bg-cream/30 transition-colors"
                  >
                    <td className="py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono font-medium text-cocoa-dark hover:text-gold text-xs"
                      >
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="py-3 text-cocoa-light">
                      {order.customer_name}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          STATUS_STYLES[order.order_status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.order_status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium text-cocoa-dark">
                      ৳{Number(order.total).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-cocoa-light text-sm">
              No orders yet. Your first order will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Stat Card Component
// ============================================

function StatCard({
  label,
  value,
  icon,
  accent = "cocoa",
}: {
  label: string;
  value: string;
  icon: string;
  accent?: "cocoa" | "gold" | "rose" | "success";
}) {
  const accentColors = {
    cocoa: "text-cocoa-dark",
    gold: "text-gold",
    rose: "text-rose",
    success: "text-success",
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-cocoa/5 hover:border-gold/40 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-xs text-gray uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-serif text-2xl font-bold ${accentColors[accent]}`}>
        {value}
      </p>
    </div>
  );
}

// ============================================
// Quick Action Component
// ============================================

function QuickAction({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-4 border border-cocoa/5 hover:border-gold/40 hover:-translate-y-0.5 transition-all text-center"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-xs font-medium text-cocoa-dark">{label}</p>
    </Link>
  );
}