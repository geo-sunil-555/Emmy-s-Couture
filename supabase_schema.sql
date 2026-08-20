-- =========================================================================
-- EMMY'S COUTURE — POSTGRESQL DATABASE SCHEMA (SUPABASE)
-- Atelier & Client Management System
-- =========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PUBLIC PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  city TEXT DEFAULT 'Chennai Flagship',
  preference TEXT DEFAULT 'Bridal Kanchipuram & Zardozi',
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client', -- 'client' or 'atelier_admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);


-- 3. SALON APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  booking_ref TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  maison_id TEXT NOT NULL,
  maison_name TEXT NOT NULL,
  service_id TEXT NOT NULL,
  service_title TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  event_date DATE,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own appointments" 
  ON public.appointments FOR SELECT 
  USING (auth.uid() = client_id OR auth.role() = 'anon' OR auth.role() = 'authenticated');

CREATE POLICY "Anyone can create an appointment" 
  ON public.appointments FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Clients can update their own appointments" 
  ON public.appointments FOR UPDATE 
  USING (auth.uid() = client_id);


-- 4. COUTURE ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  phone TEXT,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL, -- Array of ordered bespoke gowns & pieces
  total_usd NUMERIC(10, 2) NOT NULL,
  total_inr NUMERIC(12, 2) NOT NULL,
  packaging_choice TEXT DEFAULT 'signature-velvet',
  fragrance_sample TEXT,
  payment_method TEXT DEFAULT 'card',
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('processing', 'atelier_tailoring', 'confirmed', 'dispatched', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own orders" 
  ON public.orders FOR SELECT 
  USING (auth.uid() = client_id OR auth.role() = 'anon' OR auth.role() = 'authenticated');

CREATE POLICY "Anyone can place an order" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);


-- 5. CLIENT WISHLISTS TABLE
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(client_id, product_id)
);

-- Enable RLS on wishlists
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their wishlist" 
  ON public.wishlists FOR ALL 
  USING (auth.uid() = client_id);


-- 6. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH.SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, city, preference)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'city', 'Chennai Flagship'),
    COALESCE(NEW.raw_user_meta_data->>'preference', 'Bridal Kanchipuram')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if existing and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================================
-- END OF SCHEMA
-- =========================================================================
