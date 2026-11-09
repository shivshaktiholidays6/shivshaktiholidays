create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  region text not null,
  scope text not null check (scope in ('domestic', 'international')),
  image_url text not null,
  image_alt text not null,
  image_position text not null default 'center',
  blurb text not null,
  overview text,
  ideal_duration text,
  best_for text,
  planning_label text,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists destinations_published_sort_idx
  on public.destinations (published, sort_order, created_at desc);
create index if not exists destinations_scope_region_idx
  on public.destinations (scope, region) where published = true;
create index if not exists destinations_featured_idx
  on public.destinations (featured) where published = true;

alter table public.destinations enable row level security;
revoke all on table public.destinations from anon, authenticated;

drop trigger if exists destinations_set_updated_at on public.destinations;
create trigger destinations_set_updated_at
before update on public.destinations
for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'destination-images',
  'destination-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on table public.destinations is
  'Admin-managed travel destinations. Public pages read published rows through the server.';
