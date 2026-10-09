"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";

// ============================================
// COCAVYN - Admin Login Page
// /admin/login
// ============================================

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabaseClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Small delay to ensure cookie is set before navigation
        await new Promise((resolve) => setTimeout(resolve, 300));
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-serif text-4xl font-bold text-cocoa-dark mb-2">
              COCAVYN
            </h1>
          </Link>
          <p className="text-cocoa-light text-sm uppercase tracking-wider">
            Admin Panel
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-cocoa/5">
          <h2 className="font-serif text-2xl font-bold text-cocoa-dark mb-6">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cocoa-dark mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cocavyn.com"
                className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-cocoa-dark mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-cocoa/10 bg-cream focus:outline-none focus:border-gold focus:bg-white transition-colors text-cocoa-dark placeholder:text-gray"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-lg font-medium transition-all ${
                loading
                  ? "bg-gray-light text-gray cursor-not-allowed"
                  : "bg-cocoa text-cream hover:bg-cocoa-dark"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cocoa/10 text-center">
            <Link
              href="/"
              className="text-sm text-cocoa-light hover:text-gold transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray mt-6">
          Only authorized admin users can access this area.
        </p>
      </div>
    </div>
  );
}