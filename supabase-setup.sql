-- Service Links Table Setup
-- Run this in Supabase SQL Editor if the service_links table doesn't exist

-- Create service_links table
CREATE TABLE IF NOT EXISTS service_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES ai_services(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_service_links_service_id ON service_links(service_id);
CREATE INDEX IF NOT EXISTS idx_service_links_display_order ON service_links(display_order);

-- Enable RLS
ALTER TABLE service_links ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service links are viewable by everyone" ON service_links;
DROP POLICY IF EXISTS "Admins can insert service links" ON service_links;
DROP POLICY IF EXISTS "Admins can update service links" ON service_links;
DROP POLICY IF EXISTS "Admins can delete service links" ON service_links;

-- Create RLS policies
CREATE POLICY "Service links are viewable by everyone" ON service_links
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert service links" ON service_links
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can update service links" ON service_links
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can delete service links" ON service_links
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'ADMIN'
    )
  );

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS update_service_links_updated_at ON service_links;
CREATE TRIGGER update_service_links_updated_at BEFORE UPDATE ON service_links
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();