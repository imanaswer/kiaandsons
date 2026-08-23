// Shown at /admin until Supabase env vars are set. Pure guidance, no secrets.
export default function AdminSetup() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-ink px-6 py-24 text-bone">
      <div className="font-display flex items-baseline gap-2 text-xl">
        K&amp;K <span className="text-xs tracking-[0.2em] opacity-60">BUILDERS</span>
      </div>
      <h1 className="font-display mt-8 text-4xl tracking-tight">Admin — setup needed</h1>
      <p className="mt-4 text-stone">
        The admin is built and ready. To switch it on, connect a Supabase project
        (free tier is fine). Three steps:
      </p>

      <ol className="mt-8 space-y-6 text-sm leading-relaxed text-bone/85">
        <li>
          <span className="font-display text-lg text-bone">1 · Create a Supabase project</span>
          <p className="mt-1 text-stone">
            At supabase.com, create a project. Copy the Project URL and the anon
            (public) key from Project Settings → API.
          </p>
        </li>
        <li>
          <span className="font-display text-lg text-bone">2 · Add environment variables</span>
          <p className="mt-1 text-stone">
            Set these in <code className="text-accent-soft">.env.local</code> (and in Vercel):
          </p>
          <pre className="mt-2 overflow-x-auto rounded-sm border border-bone/15 bg-bone/[0.03] p-4 text-xs text-bone/80">
{`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
          </pre>
        </li>
        <li>
          <span className="font-display text-lg text-bone">3 · Run the schema &amp; create an admin user</span>
          <p className="mt-1 text-stone">
            Run <code className="text-accent-soft">supabase/schema.sql</code> (in the repo) in
            the Supabase SQL editor, create the <code className="text-accent-soft">media</code>{" "}
            storage bucket, then add an admin user under Authentication → Users. Reload this page.
          </p>
        </li>
      </ol>
    </main>
  );
}
