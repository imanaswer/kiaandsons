-- K&K Company — Supabase schema for the /admin CMS.
-- Run this in the Supabase SQL editor. Then create the "media" Storage bucket
-- (see bottom) and add an admin user under Authentication → Users.

-- ---- Projects -------------------------------------------------------------
create table if not exists public.projects (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  title        text not null,
  slug         text not null unique,
  discipline   text default '',
  category     text default '',
  location     text default '',
  year         text default '',
  summary      text default '',
  body         text default '',
  cover_image  text default '',
  gallery      jsonb not null default '[]'::jsonb,
  published    boolean not null default true,
  sort_order   int not null default 0
);

-- ---- Journal / blog posts -------------------------------------------------
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  title         text not null,
  slug          text not null unique,
  excerpt       text default '',
  body          text default '',
  cover_image   text default '',
  author        text default 'K&K Company',
  published     boolean not null default true,
  published_at  date default now()
);

-- ---- Row Level Security ---------------------------------------------------
alter table public.projects enable row level security;
alter table public.posts    enable row level security;

-- Public can read only published rows.
create policy "public read published projects" on public.projects
  for select using (published = true);
create policy "public read published posts" on public.posts
  for select using (published = true);

-- Signed-in admins can do everything.
create policy "authed manage projects" on public.projects
  for all to authenticated using (true) with check (true);
create policy "authed manage posts" on public.posts
  for all to authenticated using (true) with check (true);

-- ---- Storage: create a PUBLIC bucket named "media" ------------------------
-- Easiest via Dashboard → Storage → New bucket → name "media" → Public.
-- Or uncomment to create it via SQL:
-- insert into storage.buckets (id, name, public) values ('media','media', true)
--   on conflict (id) do nothing;

-- Allow public read + authenticated write on the media bucket:
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');
create policy "authed upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "authed update media" on storage.objects
  for update to authenticated using (bucket_id = 'media');
create policy "authed delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media');
