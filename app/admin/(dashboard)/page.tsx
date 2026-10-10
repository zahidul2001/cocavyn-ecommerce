import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Admin Dashboard
// /admin
// Real stats from database
// ============================================

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch stats in parallel (faster)
  const [
    { count: productCount },
    { count: orderCount },
    { count: customerCount },
    { data: ordersData },
    { data: recentOrders },
    { count: pendingOrders },
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

    // All orders totals (for sales sum)
    supabase.from("orders").select("total"),

    // Recent 5 orders
    supabase
      .from("orders")
      .select("id, order_number, customer_name, total, order_status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    // Pending orders
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("order_status", "pending"),
  ]);

  // Calculate total sales
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

      {/* Stats Grid */}
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

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-cocoa/5">
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
        </div>

        <div className="bg-white rounded-2xl p-5 border border-cocoa/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray uppercase tracking-wider mb-1">
                Quick Actions
              </p>
              <div className="flex gap-2 mt-2">
                <a
                  href="/admin/products"
                  className="text-xs bg-cocoa text-cream px-3 py-1.5 rounded-lg hover:bg-cocoa-dark transition-colors"
                >
                  Manage Products
                </a>
                <a
                  href="/admin/orders"
                  className="text-xs bg-gold text-cocoa-dark px-3 py-1.5 rounded-lg hover:bg-gold-dark transition-colors"
                >
                  View Orders
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl font-bold text-cocoa-dark">
            Recent Orders
          </h3>
          <a
            href="/admin/orders"
            className="text-sm text-gold hover:text-gold-dark transition-colors"
          >
            View All →
          </a>
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
                    className="border-b border-cocoa/5 last:border-0"
                  >
                    <td className="py-3 font-medium text-cocoa-dark">
                      {order.order_number}
                    </td>
                    <td className="py-3 text-cocoa-light">
                      {order.customer_name}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={order.order_status} />
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
      <p
        className={`font-serif text-2xl font-bold ${accentColors[accent]}`}
      >
        {value}
      </p>
    </div>
  );
}

// ============================================
// Status Badge Component
// ============================================

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    packed: "bg-indigo-100 text-indigo-800",
    shipped: "bg-cyan-100 text-cyan-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const style = styles[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${style}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}