-- Run in the EXISTING Ethan ID Supabase project SQL editor.
-- Only authenticated users can read and write their own Creator projects.
create table if not exists public.ethan_creator_projects (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(name) between 1 and 120),
 studio text not null check (studio in ('design','website','video')),
 document jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists ethan_creator_projects_owner_idx on public.ethan_creator_projects(owner_id,updated_at desc);
alter table public.ethan_creator_projects enable row level security;
revoke all on public.ethan_creator_projects from anon;
grant select,insert,update,delete on public.ethan_creator_projects to authenticated;
drop policy if exists creator_owner_select on public.ethan_creator_projects;
drop policy if exists creator_owner_insert on public.ethan_creator_projects;
drop policy if exists creator_owner_update on public.ethan_creator_projects;
drop policy if exists creator_owner_delete on public.ethan_creator_projects;
create policy creator_owner_select on public.ethan_creator_projects for select to authenticated using ((select auth.uid())=owner_id);
create policy creator_owner_insert on public.ethan_creator_projects for insert to authenticated with check ((select auth.uid())=owner_id);
create policy creator_owner_update on public.ethan_creator_projects for update to authenticated using ((select auth.uid())=owner_id) with check ((select auth.uid())=owner_id);
create policy creator_owner_delete on public.ethan_creator_projects for delete to authenticated using ((select auth.uid())=owner_id);
