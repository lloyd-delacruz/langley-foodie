-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create posts table for blog content
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  excerpt text,
  featured_image text,
  category text check (category in ('langley-bites', 'travels', 'mom-life', 'reels')) not null,
  published boolean default false,
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create storage buckets
insert into storage.buckets (id, name, public) values 
  ('post-images', 'post-images', true),
  ('avatars', 'avatars', true);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Posts policies
create policy "Published posts are viewable by everyone" on public.posts
  for select using (published = true);

create policy "Authors can view their own posts" on public.posts
  for select using (auth.uid() = author_id);

create policy "Authors can create posts" on public.posts
  for insert with check (auth.uid() = author_id);

create policy "Authors can update their own posts" on public.posts
  for update using (auth.uid() = author_id);

create policy "Authors can delete their own posts" on public.posts
  for delete using (auth.uid() = author_id);

-- Storage policies
create policy "Public can view post images" on storage.objects
  for select using (bucket_id = 'post-images');

create policy "Authenticated users can upload post images" on storage.objects
  for insert with check (bucket_id = 'post-images' and auth.role() = 'authenticated');

create policy "Users can update their own post images" on storage.objects
  for update using (bucket_id = 'post-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Public can view avatars" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own avatar" on storage.objects
  for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.posts
  for each row execute procedure public.handle_updated_at();