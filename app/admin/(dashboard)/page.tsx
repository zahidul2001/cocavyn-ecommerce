// ============================================
// COCAVYN - Admin Dashboard
// /admin
// Layout handles authentication
// ============================================

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-cocoa-dark mb-2">
        Welcome back! 👋
      </h1>
      <p className="text-cocoa-light mb-8">
        This is your admin dashboard. Stats and metrics coming in Part 7.6.
      </p>

      {/* Placeholder Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Sales" value="৳0" icon="💰" />
        <StatCard label="Orders" value="0" icon="📦" />
        <StatCard label="Products" value="8" icon="🍫" />
        <StatCard label="Customers" value="0" icon="👥" />
      </div>

      {/* Placeholder info */}
      <div className="bg-white rounded-2xl p-6 border border-cocoa/5">
        <h3 className="font-serif text-xl font-bold text-cocoa-dark mb-3">
          Next Steps
        </h3>
        <ul className="space-y-2 text-cocoa-light text-sm">
          <li>✅ Login system working</li>
          <li>⏳ Real stats coming in Part 7.6</li>
          <li>⏳ Product management in Part 7.7</li>
          <li>⏳ Orders, Customers later</li>
        </ul>
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
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-cocoa/5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-xs text-gray uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-serif text-2xl font-bold text-cocoa-dark">{value}</p>
    </div>
  );
}