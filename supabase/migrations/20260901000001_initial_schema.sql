-- ==============================================================================
-- SAHAKARI SEVA (COOPERATIVE GIG SERVICES PLATFORM) — INITIAL SCHEMA MIGRATION
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. COOPERATIVES TABLE
CREATE TABLE IF NOT EXISTS cooperatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    logo_url TEXT,
    welfare_pool_balance DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES TABLE (Linked with Supabase Auth or Local Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'worker', 'admin')),
    profile_photo TEXT,
    address TEXT,
    city VARCHAR(100) DEFAULT 'New Delhi',
    state VARCHAR(100) DEFAULT 'Delhi',
    pincode VARCHAR(10) DEFAULT '110001',
    language VARCHAR(10) DEFAULT 'en' CHECK (language IN ('en', 'hi')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SERVICE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    emergency_available BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WORKERS TABLE
CREATE TABLE IF NOT EXISTS workers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE RESTRICT,
    worker_code VARCHAR(50) UNIQUE NOT NULL,
    skill_category VARCHAR(100) NOT NULL,
    skills TEXT[] DEFAULT '{}',
    experience_years INTEGER NOT NULL DEFAULT 1,
    bio TEXT,
    service_area VARCHAR(255) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    hourly_or_base_rate DECIMAL(10,2) NOT NULL,
    availability_status VARCHAR(30) DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'offline', 'emergency_only')),
    verification_status VARCHAR(30) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    verification_notes TEXT,
    certification_url TEXT,
    certification_name VARCHAR(255),
    certification_expiry DATE,
    average_rating DECIMAL(3,2) DEFAULT 5.00,
    total_jobs INTEGER DEFAULT 0,
    total_earnings DECIMAL(12,2) DEFAULT 0.00,
    welfare_status VARCHAR(50) DEFAULT 'Active Member',
    insurance_status VARCHAR(50) DEFAULT 'Covered (Ayushman/PMJJBY)',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE RESTRICT,
    service_category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
    cooperative_id UUID NOT NULL REFERENCES cooperatives(id) ON DELETE RESTRICT,
    booking_date DATE NOT NULL,
    booking_time VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    service_description TEXT NOT NULL,
    estimated_amount DECIMAL(10,2) NOT NULL,
    final_amount DECIMAL(10,2) NOT NULL,
    is_emergency BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled', 'in_progress', 'completed')),
    payment_status VARCHAR(30) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. RATINGS TABLE
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'demo' CHECK (payment_method IN ('upi', 'card', 'netbanking', 'cash', 'demo')),
    transaction_reference VARCHAR(100) NOT NULL,
    status VARCHAR(30) DEFAULT 'paid' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_gateway VARCHAR(50) DEFAULT 'Demo Payment Gateway',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    subtotal DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL, -- 5%
    cooperative_share DECIMAL(10,2) NOT NULL, -- 10% towards welfare & pension fund
    worker_amount DECIMAL(10,2) NOT NULL, -- 85% directly to worker
    tax DECIMAL(10,2) NOT NULL, -- 0% or 5% GST
    total_amount DECIMAL(10,2) NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. WELFARE TABLE
CREATE TABLE IF NOT EXISTS welfare (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
    welfare_scheme VARCHAR(255) NOT NULL,
    enrollment_status VARCHAR(50) DEFAULT 'Active' CHECK (enrollment_status IN ('Active', 'Pending', 'Renewed', 'Expired')),
    contribution_balance DECIMAL(10,2) DEFAULT 0.00,
    insurance_status VARCHAR(50) DEFAULT 'Covered',
    insurance_provider VARCHAR(255) DEFAULT 'National Insurance Co-op Ltd.',
    policy_reference VARCHAR(100),
    valid_until DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HIGH-EFFICIENCY QUERYING
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_workers_pincode ON workers(pincode);
CREATE INDEX IF NOT EXISTS idx_workers_verification ON workers(verification_status);
CREATE INDEX IF NOT EXISTS idx_workers_category ON workers(skill_category);
CREATE INDEX IF NOT EXISTS idx_workers_availability ON workers(availability_status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_worker ON bookings(worker_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_coop ON bookings(cooperative_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, read);

-- AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_profiles_updated ON profiles;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_workers_updated ON workers;
CREATE TRIGGER trg_workers_updated BEFORE UPDATE ON workers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_bookings_updated ON bookings;
CREATE TRIGGER trg_bookings_updated BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_cooperatives_updated ON cooperatives;
CREATE TRIGGER trg_cooperatives_updated BEFORE UPDATE ON cooperatives FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE welfare ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Permissive public read for public catalog data
CREATE POLICY "Public can view active service categories" ON service_categories FOR SELECT USING (active = true);
CREATE POLICY "Public can view cooperatives" ON cooperatives FOR SELECT USING (true);
CREATE POLICY "Public can view verified workers" ON workers FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Public can view profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public can view ratings" ON ratings FOR SELECT USING (true);
