import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

// Cookie-free anon client for PUBLIC reads (published content only, via RLS).
// No cookies() → public pages can stay static / ISR-cached.
export function createPublicClient() {
  if (!isSupabaseConfigured) return null;
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
