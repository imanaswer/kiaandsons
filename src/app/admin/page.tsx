import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSetup from "@/components/admin/AdminSetup";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  if (!isSupabaseConfigured) return <AdminSetup />;
  // Auth is enforced by middleware; only signed-in admins reach here.
  return <AdminDashboard />;
}
