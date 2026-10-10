import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

// ============================================
// COCAVYN - Admin Layout
// Applies to (dashboard) route group
// /admin/login is OUTSIDE this group
// ============================================

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is logged in
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → redirect to login
  if (!user) {
    redirect("/admin/login");
  }

  // Logged in → show full admin layout
  return (
    <div className="min-h-screen bg-cream-dark flex">
      <AdminSidebar userEmail={user.email || ""} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader userEmail={user.email || ""} />
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}