"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-bone">
      <div className="w-full max-w-sm">
        <div className="font-display flex items-baseline gap-2 text-xl">
          K&amp;K <span className="text-xs tracking-[0.2em] opacity-60">BUILDERS</span>
        </div>
        <h1 className="font-display mt-8 text-3xl tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-sm text-stone">Manage projects and journal posts.</p>

        {!isSupabaseConfigured ? (
          <p className="mt-8 rounded-sm border border-bone/15 p-4 text-sm text-stone">
            Supabase isn&apos;t configured yet. Add the environment variables and reload.
          </p>
        ) : (
          <form onSubmit={signIn} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-stone">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-sm border border-bone/20 bg-transparent px-4 py-3 text-bone outline-none focus:border-bone"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-stone">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-sm border border-bone/20 bg-transparent px-4 py-3 text-bone outline-none focus:border-bone"
              />
            </div>
            {error && <p className="text-sm text-accent-soft">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-bone px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-bone disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
