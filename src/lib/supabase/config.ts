// Supabase env. The site works without these (public pages fall back to
// static content); the admin is only active once they're set.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Public Storage bucket for uploaded images.
export const MEDIA_BUCKET = "media";
