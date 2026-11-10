alter table public.packages
  add column if not exists social_image_url text,
  add column if not exists noindex boolean not null default false,
  add column if not exists canonical_url text;

alter table public.destinations
  add column if not exists social_image_url text,
  add column if not exists noindex boolean not null default false,
  add column if not exists canonical_url text;

create table if not exists public.content_redirects (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('package', 'destination')),
  old_slug text not null check (old_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  new_slug text not null check (new_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (content_type, old_slug),
  check (old_slug <> new_slug)
);

create index if not exists content_redirects_target_idx
  on public.content_redirects (content_type, new_slug);

alter table public.content_redirects enable row level security;
revoke all on table public.content_redirects from anon, authenticated;

drop trigger if exists content_redirects_set_updated_at on public.content_redirects;
create trigger content_redirects_set_updated_at
before update on public.content_redirects
for each row execute function public.set_updated_at();

comment on table public.content_redirects is
  'Permanent old-to-new slug mappings created when an admin changes a public content URL.';

comment on column public.packages.noindex is
  'When true, the package stays public but is excluded from the sitemap and marked noindex.';

comment on column public.destinations.noindex is
  'When true, the destination stays public but is excluded from the sitemap and marked noindex.';
