-- Supabase schema untuk portofolio Azmi
-- Jalankan ini di SQL Editor pada dashboard Supabase Anda.

-- ============================================================
-- TABEL
-- ============================================================

-- Tabel: profile (satu baris saja)
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  short_description text,
  about text,
  photo_url text,
  skills text[] default '{}',
  updated_at timestamptz default now()
);

-- Tabel: education
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  year_start integer not null,
  year_end integer,
  description text,
  created_at timestamptz default now()
);

-- Tabel: certifications
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  year_issued integer not null,
  year_expires integer,
  file_url text,
  created_at timestamptz default now()
);

-- Tabel: projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  images text[] default '{}',
  tech_stack text[] default '{}',
  demo_url text,
  github_url text,
  optional_info jsonb default '[]',
  created_at timestamptz default now()
);

-- Tabel: experience
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  year_start integer not null,
  year_end integer,
  description text,
  created_at timestamptz default now()
);

-- Tabel: contact (satu baris saja)
create table if not exists contact (
  id uuid primary key default gen_random_uuid(),
  email text,
  github text,
  linkedin text,
  updated_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Wajib dijalankan agar data bisa dibaca dan ditulis.
-- Public bisa READ semua tabel (portfolio bersifat publik).
-- Hanya user yang sudah login (admin) yang bisa WRITE.
-- ============================================================

-- Aktifkan RLS
alter table profile enable row level security;
alter table education enable row level security;
alter table certifications enable row level security;
alter table projects enable row level security;
alter table experience enable row level security;
alter table contact enable row level security;

-- Profile: public read, authenticated write
create policy "Public can read profile"
  on profile for select using (true);
create policy "Authenticated can insert profile"
  on profile for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update profile"
  on profile for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete profile"
  on profile for delete using (auth.role() = 'authenticated');

-- Education: public read, authenticated write
create policy "Public can read education"
  on education for select using (true);
create policy "Authenticated can insert education"
  on education for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update education"
  on education for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete education"
  on education for delete using (auth.role() = 'authenticated');

-- Certifications: public read, authenticated write
create policy "Public can read certifications"
  on certifications for select using (true);
create policy "Authenticated can insert certifications"
  on certifications for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update certifications"
  on certifications for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete certifications"
  on certifications for delete using (auth.role() = 'authenticated');

-- Projects: public read, authenticated write
create policy "Public can read projects"
  on projects for select using (true);
create policy "Authenticated can insert projects"
  on projects for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update projects"
  on projects for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete projects"
  on projects for delete using (auth.role() = 'authenticated');

-- Experience: public read, authenticated write
create policy "Public can read experience"
  on experience for select using (true);
create policy "Authenticated can insert experience"
  on experience for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update experience"
  on experience for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete experience"
  on experience for delete using (auth.role() = 'authenticated');

-- Contact: public read, authenticated write
create policy "Public can read contact"
  on contact for select using (true);
create policy "Authenticated can insert contact"
  on contact for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update contact"
  on contact for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete contact"
  on contact for delete using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET
-- Buat di Storage > New bucket > nama: "portfolio" > Public: true
-- Lalu jalankan policy berikut di SQL Editor:
-- ============================================================

-- Storage: public read
create policy "Public can read portofolio storage"
  on storage.objects for select
  using (bucket_id = 'portofolio');

-- Storage: authenticated upload
create policy "Authenticated can upload to portofolio storage"
  on storage.objects for insert
  with check (bucket_id = 'portofolio' and auth.role() = 'authenticated');

-- Storage: authenticated update
create policy "Authenticated can update portofolio storage"
  on storage.objects for update
  using (bucket_id = 'portofolio' and auth.role() = 'authenticated');

-- Storage: authenticated delete
create policy "Authenticated can delete from portofolio storage"
  on storage.objects for delete
  using (bucket_id = 'portofolio' and auth.role() = 'authenticated');
