import { createClient } from "@supabase/supabase-js";

// ============================================
// COCAVYN - Supabase ADMIN Client
// SERVER-SIDE ONLY
// Uses service_role key — never exposed to browser
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL in .env.local — please add it."
  );
}

if (!supabaseServiceKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY in .env.local — please add it. " +
    "This key is SERVER-SIDE ONLY. Never expose it to the browser."
  );
}

// ============================================
// Admin Client
// Bypasses RLS (Row Level Security)
// Can do everything: read, write, delete
// ⚠️ NEVER import this in client components
// ============================================

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});