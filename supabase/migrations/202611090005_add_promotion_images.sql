alter table public.promotions
  add column if not exists image_url text,
  add column if not exists image_alt text,
  add column if not exists image_position text not null default 'center';

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

comment on column public.promotions.image_url is
  'Optional image. When present, the promotion is displayed as a floating offer card.';
