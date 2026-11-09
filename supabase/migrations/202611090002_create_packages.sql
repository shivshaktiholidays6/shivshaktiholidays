create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  destination_slug text not null,
  place text not null,
  scope text not null check (scope in ('domestic', 'international')),
  nights integer not null check (nights between 1 and 60),
  price integer not null check (price >= 0),
  types text[] not null default '{}',
  image_url text not null,
  image_alt text not null,
  image_position text not null default 'center',
  summary text not null,
  highlights text[] not null default '{}',
  itinerary jsonb not null default '[]'::jsonb check (jsonb_typeof(itinerary) = 'array'),
  inclusions text[] not null default '{}',
  exclusions text[] not null default '{}',
  most_booked boolean not null default false,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists packages_published_sort_idx
  on public.packages (published, sort_order, created_at desc);
create index if not exists packages_scope_idx on public.packages (scope) where published = true;
create index if not exists packages_featured_idx on public.packages (featured) where published = true;

alter table public.packages enable row level security;
revoke all on table public.packages from anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists packages_set_updated_at on public.packages;
create trigger packages_set_updated_at
before update on public.packages
for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'package-images',
  'package-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on table public.packages is
  'Admin-managed holiday packages. Public pages read published rows through the server.';
