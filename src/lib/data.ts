import { work } from "@/lib/content";
import { createPublicClient } from "@/lib/supabase/public";

export type Project = {
  slug: string;
  title: string;
  discipline: string;
  category: string | null;
  location: string | null;
  year: string | null;
  summary: string;
  body: string | null;
  cover_image: string;
  gallery: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  author: string | null;
  published_at: string | null;
};

// ---- Fallbacks (used until Supabase is configured & populated) -------------
const fallbackProjects: Project[] = work.map((w) => ({
  slug: w.slug,
  title: w.title,
  discipline: w.discipline,
  category: w.discipline,
  location: null,
  year: null,
  summary: w.intro,
  body: null,
  cover_image: w.image,
  gallery: [],
}));

const fallbackPosts: Post[] = [
  {
    slug: "one-team-concept-to-completion",
    title: "Why we keep design and build under one roof",
    excerpt:
      "When architecture, engineering, construction and interiors answer to one team, nothing falls between the trades — and the finished space matches the first sketch.",
    body: "When architecture, engineering, construction and interiors are handled by separate firms, the gaps between them are where quality and timelines slip. We keep every discipline under one accountable team so decisions are made once, coordinated across trades, and carried from the first drawing to the final styled interior.\n\nThis is how we work: understand the brief, the site and the budget; resolve the design into permit and working drawings; engineer and cost it honestly; build it with the right craftsmen; and finish it with interiors and services for a clean, on-time handover.",
    cover_image: "/images/projects/architect-desk.jpg",
    author: "K&K Builders",
    published_at: "2026-01-15",
  },
  {
    slug: "sourcing-furniture-lighting-china",
    title: "Sourcing furniture & lighting from China, the right way",
    excerpt:
      "We import furniture and lighting directly from China for our clients — curated to the interior, quality-checked, and delivered to the project.",
    body: "Great interiors need the right pieces, and the right pieces aren't always available locally. We import furniture and lighting directly from China for our clients — selected to suit the interior design, quality-checked before shipping, and delivered to your project.\n\nBecause the sourcing sits inside the same team that designs and builds your space, the pieces are chosen to fit the room, the light and the finishes — not picked from a catalogue in isolation.",
    cover_image: "/images/projects/interiors-living.jpg",
    author: "K&K Builders",
    published_at: "2026-02-02",
  },
];

// ---- Access layer ----------------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackProjects;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return fallbackProjects;
  return data as Project[];
}

export async function getProject(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackProjects.find((p) => p.slug === slug) ?? null;
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Project) ?? fallbackProjects.find((p) => p.slug === slug) ?? null;
}

export async function getPosts(): Promise<Post[]> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackPosts;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return fallbackPosts;
  return data as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = createPublicClient();
  if (!supabase) return fallbackPosts.find((p) => p.slug === slug) ?? null;
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post) ?? fallbackPosts.find((p) => p.slug === slug) ?? null;
}
