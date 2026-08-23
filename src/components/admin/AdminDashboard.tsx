"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MEDIA_BUCKET } from "@/lib/supabase/config";

type Project = {
  id?: string;
  title: string;
  slug: string;
  discipline: string;
  category: string;
  location: string;
  year: string;
  summary: string;
  body: string;
  cover_image: string;
  gallery: string[];
  published: boolean;
  sort_order: number;
};

type Post = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image: string;
  author: string;
  published: boolean;
  published_at: string;
};

const emptyProject: Project = {
  title: "", slug: "", discipline: "", category: "", location: "", year: "",
  summary: "", body: "", cover_image: "", gallery: [], published: true, sort_order: 0,
};
const emptyPost: Post = {
  title: "", slug: "", excerpt: "", body: "", cover_image: "", author: "K&K Builders",
  published: true, published_at: new Date().toISOString().slice(0, 10),
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [tab, setTab] = useState<"projects" | "posts">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Project | Post | null>(null);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");

  const load = useCallback(async () => {
    const [{ data: pj }, { data: ps }, { data: auth }] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("posts").select("*").order("published_at", { ascending: false }),
      supabase.auth.getUser(),
    ]);
    setProjects((pj as Project[]) ?? []);
    setPosts((ps as Post[]) ?? []);
    setEmail(auth?.user?.email ?? "");
  }, [supabase]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- async fetch; state set after await
  useEffect(() => { load(); }, [load]);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  async function uploadFile(file: File): Promise<string> {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file);
    if (error) throw error;
    return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
  }

  async function save() {
    if (!editing) return;
    const base = { ...editing };
    if (!base.slug) base.slug = slugify(base.title);
    try {
      let error = null;
      if (tab === "projects") {
        const row = base as Project;
        ({ error } = row.id
          ? await supabase.from("projects").update(row).eq("id", row.id)
          : await supabase.from("projects").insert(row));
      } else {
        const row = base as Post;
        ({ error } = row.id
          ? await supabase.from("posts").update(row).eq("id", row.id)
          : await supabase.from("posts").insert(row));
      }
      if (error) throw error;
      setEditing(null);
      flash("Saved.");
      load();
    } catch (e) {
      flash(e instanceof Error ? e.message : "Save failed.");
    }
  }

  async function remove(table: "projects" | "posts", id?: string) {
    if (!id || !confirm("Delete this item permanently?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    flash(error ? error.message : "Deleted.");
    load();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-paper/90 px-6 py-4 backdrop-blur-xl">
        <div className="font-display flex items-baseline gap-2 text-lg">
          K&amp;K <span className="text-[0.6rem] tracking-[0.2em] opacity-60">ADMIN</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-concrete sm:inline">{email}</span>
          <a href="/" target="_blank" className="text-concrete hover:text-ink">View site ↗</a>
          <button onClick={signOut} className="rounded-full border border-ink/20 px-4 py-1.5 hover:border-ink">
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          {(["projects", "posts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setEditing(null); }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                tab === t ? "bg-ink text-bone" : "border border-ink/20 hover:border-ink"
              }`}
            >
              {t === "projects" ? "Projects" : "Journal"}
            </button>
          ))}
          <button
            onClick={() => setEditing(tab === "projects" ? { ...emptyProject } : { ...emptyPost })}
            className="ml-auto rounded-full bg-accent px-5 py-2 text-sm font-medium text-bone hover:opacity-90"
          >
            + New {tab === "projects" ? "project" : "post"}
          </button>
        </div>

        {msg && <p className="mt-4 rounded-sm bg-ink px-4 py-2 text-sm text-bone">{msg}</p>}

        {/* Editor */}
        {editing && (
          <div className="mt-6 rounded-md border border-ink/15 bg-bone p-6">
            {tab === "projects"
              ? <ProjectFields item={editing as Project} set={setEditing} upload={uploadFile} />
              : <PostFields item={editing as Post} set={setEditing} upload={uploadFile} />}
            <div className="mt-6 flex items-center gap-3">
              <button onClick={save} className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-bone hover:bg-accent">
                Save
              </button>
              <button onClick={() => setEditing(null)} className="text-sm text-concrete hover:text-ink">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {(tab === "projects" ? projects : posts).map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm bg-graphite">
                {item.cover_image && (
                  <Image src={item.cover_image} alt="" fill sizes="80px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.title || "(untitled)"}</p>
                <p className="truncate text-xs text-concrete">/{item.slug}</p>
              </div>
              {!item.published && (
                <span className="rounded-full bg-ink/10 px-2.5 py-1 text-xs text-concrete">Draft</span>
              )}
              <button onClick={() => setEditing(item)} className="text-sm text-concrete hover:text-ink">Edit</button>
              <button onClick={() => remove(tab, item.id)} className="text-sm text-concrete hover:text-accent">Delete</button>
            </li>
          ))}
          {(tab === "projects" ? projects : posts).length === 0 && (
            <li className="py-10 text-center text-sm text-concrete">
              Nothing yet. Click “New” to add your first {tab === "projects" ? "project" : "post"}.
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}

/* ---- Field groups --------------------------------------------------------- */
function Text({ label, value, onChange, textarea, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-concrete">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5}
          className="w-full rounded-sm border border-ink/20 bg-transparent px-3 py-2 outline-none focus:border-ink" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-sm border border-ink/20 bg-transparent px-3 py-2 outline-none focus:border-ink" />
      )}
    </label>
  );
}

function ImageField({ label, value, onChange, upload }: {
  label: string; value: string; onChange: (v: string) => void; upload: (f: File) => Promise<string>;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <span className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-concrete">{label}</span>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border border-ink/15 bg-graphite">
          {value && <Image src={value} alt="" fill sizes="96px" className="object-cover" />}
        </div>
        <label className="cursor-pointer rounded-full border border-ink/20 px-4 py-2 text-sm hover:border-ink">
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            setBusy(true);
            try { onChange(await upload(f)); } catch (err) { alert(err instanceof Error ? err.message : "Upload failed"); }
            setBusy(false);
          }} />
        </label>
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
      {label}
    </label>
  );
}

function ProjectFields({ item, set, upload }: {
  item: Project; set: (p: Project) => void; upload: (f: File) => Promise<string>;
}) {
  const u = (patch: Partial<Project>) => set({ ...item, ...patch });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Text label="Title" value={item.title} onChange={(v) => u({ title: v, slug: item.slug || slugify(v) })} />
      <Text label="Slug" value={item.slug} onChange={(v) => u({ slug: v })} />
      <Text label="Discipline (e.g. Architecture · Construction)" value={item.discipline} onChange={(v) => u({ discipline: v })} />
      <Text label="Category (e.g. Residential)" value={item.category} onChange={(v) => u({ category: v })} />
      <Text label="Location" value={item.location} onChange={(v) => u({ location: v })} />
      <Text label="Year" value={item.year} onChange={(v) => u({ year: v })} />
      <div className="sm:col-span-2"><Text label="Summary" value={item.summary} onChange={(v) => u({ summary: v })} textarea /></div>
      <div className="sm:col-span-2"><Text label="Body" value={item.body} onChange={(v) => u({ body: v })} textarea /></div>
      <div className="sm:col-span-2"><ImageField label="Cover image" value={item.cover_image} onChange={(v) => u({ cover_image: v })} upload={upload} /></div>
      <Text label="Sort order" type="number" value={String(item.sort_order)} onChange={(v) => u({ sort_order: Number(v) || 0 })} />
      <div className="flex items-end"><Toggle label="Published" value={item.published} onChange={(v) => u({ published: v })} /></div>
    </div>
  );
}

function PostFields({ item, set, upload }: {
  item: Post; set: (p: Post) => void; upload: (f: File) => Promise<string>;
}) {
  const u = (patch: Partial<Post>) => set({ ...item, ...patch });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Text label="Title" value={item.title} onChange={(v) => u({ title: v, slug: item.slug || slugify(v) })} />
      <Text label="Slug" value={item.slug} onChange={(v) => u({ slug: v })} />
      <Text label="Author" value={item.author} onChange={(v) => u({ author: v })} />
      <Text label="Published date" type="date" value={item.published_at} onChange={(v) => u({ published_at: v })} />
      <div className="sm:col-span-2"><Text label="Excerpt" value={item.excerpt} onChange={(v) => u({ excerpt: v })} textarea /></div>
      <div className="sm:col-span-2"><Text label="Body" value={item.body} onChange={(v) => u({ body: v })} textarea /></div>
      <div className="sm:col-span-2"><ImageField label="Cover image" value={item.cover_image} onChange={(v) => u({ cover_image: v })} upload={upload} /></div>
      <div className="flex items-end"><Toggle label="Published" value={item.published} onChange={(v) => u({ published: v })} /></div>
    </div>
  );
}
