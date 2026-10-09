import { createBrowserClient } from "@supabase/ssr";

// ============================================
// COCAVYN - Supabase Browser Client
// Uses cookies (not localStorage) so server can read session
// ============================================

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Keep a singleton for client-side usage
let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!browserClient) {
    browserClient = createClient();
  }
  return browserClient;
}