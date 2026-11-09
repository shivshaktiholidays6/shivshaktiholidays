create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  offer_text text,
  coupon_code text,
  cta_label text,
  cta_href text,
  terms_text text,
  image_url text,
  image_alt text,
  image_position text not null default 'center',
  placement text not null default 'sitewide' check (placement in ('sitewide', 'homepage')),
  theme text not null default 'diwali' check (theme in ('diwali', 'gold', 'navy')),
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default false,
  dismissible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create index if not exists promotions_active_schedule_idx
  on public.promotions (active, starts_at, ends_at, sort_order);

alter table public.promotions enable row level security;
revoke all on table public.promotions from anon, authenticated;

drop trigger if exists promotions_set_updated_at on public.promotions;
create trigger promotions_set_updated_at
before update on public.promotions
for each row execute function public.set_updated_at();

comment on table public.promotions is
  'Admin-managed website announcement and promotional banners.';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'promotion-images',
  'promotion-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
