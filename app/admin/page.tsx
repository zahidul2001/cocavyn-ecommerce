import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ============================================
// COCAVYN - Admin Dashboard (Protected)
// /admin
// ============================================

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → redirect to login
  if (!user) {
    redirect("/admin/login");
  }

  // Logged in → show dashboard
  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-cocoa-dark mb-4">
          Welcome to Admin Panel
        </h1>
        <p className="text-cocoa-light mb-2">
          Logged in as: <strong>{user.email}</strong>
        </p>
        <p className="text-cocoa-light mb-8">
          Full dashboard coming in Part 7.6.
        </p>

        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg">
          <p className="font-bold mb-2">✅ Login Successful</p>
          <p className="text-sm">
            You are authenticated. Admin Panel functionality will be added in
            the next part.
          </p>
        </div>
      </div>
    </div>
  );
}