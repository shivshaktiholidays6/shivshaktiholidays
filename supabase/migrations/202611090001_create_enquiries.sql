create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_code text not null unique,
  type text not null check (type in ('general', 'package', 'popup', 'plan_trip')),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'confirmed', 'lost')),
  source text not null default 'website',
  name text not null,
  phone text not null,
  email text not null,
  consent boolean not null default false,
  destination text,
  destination_slug text,
  departure_city text,
  package_name text,
  package_slug text,
  travel_start date,
  travel_end date,
  travellers integer,
  adults integer,
  children integer,
  infants integer,
  days integer,
  preferences text[] not null default '{}',
  budget text,
  message text,
  page_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status, created_at desc);
create index if not exists enquiries_type_idx on public.enquiries (type, created_at desc);
create index if not exists enquiries_package_slug_idx on public.enquiries (package_slug)
  where package_slug is not null;

alter table public.enquiries enable row level security;

revoke all on table public.enquiries from anon, authenticated;

create or replace function public.set_enquiry_updated_at()
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

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at
before update on public.enquiries
for each row execute function public.set_enquiry_updated_at();

comment on table public.enquiries is
  'Website travel enquiries. Browser roles have no direct access; writes go through the server API.';
