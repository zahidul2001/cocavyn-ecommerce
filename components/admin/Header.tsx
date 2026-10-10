"use client";

import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

// ============================================
// COCAVYN - Admin Header
// Top bar of admin panel with logout
// ============================================

interface HeaderProps {
  userEmail: string;
}

export default function AdminHeader({ userEmail }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-cocoa/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h2 className="font-serif text-xl font-bold text-cocoa-dark">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-xs text-gray uppercase tracking-wider">
            Logged in as
          </p>
          <p className="text-sm font-medium text-cocoa-dark">{userEmail}</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cream text-cocoa-dark hover:bg-cocoa hover:text-cream transition-colors text-sm font-medium"
        >
          <LogoutIcon />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

// ============================================
// Icons
// ============================================

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}